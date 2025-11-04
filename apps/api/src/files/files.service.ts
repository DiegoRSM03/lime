import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Note, NoteType } from './entities/note.entity';
import { UploadAudioDto } from './dto/upload-audio.dto';
import { UploadTextDto } from './dto/upload-text.dto';
import { NoteResponseDto } from '../notes/dto/note-response.dto';
import { PatientsService } from '../patients/patients.service';
import { TranscriptionService } from '../transcription/transcription.service';
import { SummaryService } from '../summary/summary.service';

@Injectable()
export class FilesService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private configService: ConfigService,
    private patientsService: PatientsService,
    private transcriptionService: TranscriptionService,
    private summaryService: SummaryService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION', process.env.AWS_REGION),
      credentials: {
        accessKeyId: this.configService.get(
          'AWS_ACCESS_KEY_ID',
          process.env.AWS_ACCESS_KEY,
        ),
        secretAccessKey: this.configService.get(
          'AWS_SECRET_ACCESS_KEY',
          process.env.AWS_SECRET_ACCESS_KEY,
        ),
      },
    });
    this.bucketName = this.configService.get(
      'AWS_S3_BUCKET_NAME',
      process.env.AWS_S3_BUCKET_NAME,
    );
  }

  async uploadAudio(
    file: Express.Multer.File,
    uploadAudioDto: UploadAudioDto,
  ): Promise<NoteResponseDto> {
    try {
      try {
        await this.patientsService.findOne(uploadAudioDto.patientUuid);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('Patient not found');
        }
        throw error;
      }

      const timestamp = Date.now();
      const fileExtension = file.originalname.split('.').pop();
      const s3Key = `audio/${uploadAudioDto.patientUuid}/${timestamp}.${fileExtension}`;

      const uploadParams = {
        Bucket: this.bucketName,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          patientUuid: uploadAudioDto.patientUuid,
          dateOfFile: uploadAudioDto.dateOfFile.toString(),
        },
      };

      await this.s3Client.send(new PutObjectCommand(uploadParams));

      const s3Url = `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION', process.env.AWS_REGION)}.amazonaws.com/${s3Key}`;

      let transcription: string | null = null;
      try {
        transcription = await this.transcriptionService.transcribeAudio(
          file.buffer,
          file.originalname,
        );
      } catch (error) {
        console.error('Transcription failed:', error);
        // Continue without transcription rather than failing the whole upload
      }

      // Generate summary if we have transcription
      let summary = null;
      if (transcription) {
        try {
          summary =
            await this.summaryService.generateSOAPSummary(transcription);
        } catch (error) {
          console.error('Summary generation failed:', error);
          // Continue without summary rather than failing the whole upload
        }
      }

      const note = this.noteRepository.create({
        patientUuid: uploadAudioDto.patientUuid,
        type: NoteType.AUDIO,
        s3Url,
        rawNotes: null,
        transcription,
        summary,
        dateOfRecording: new Date(uploadAudioDto.dateOfFile),
      });

      const savedNote = await this.noteRepository.save(note);
      return await this.toResponseDto(savedNote);
    } catch (error) {
      console.error('Error uploading audio:', error);
      if (error instanceof Error && error.name === 'NoSuchBucket') {
        throw new InternalServerErrorException(
          'S3 bucket not configured properly',
        );
      }
      throw new InternalServerErrorException('Failed to upload audio file');
    }
  }

  async uploadText(uploadTextDto: UploadTextDto): Promise<NoteResponseDto> {
    try {
      await this.patientsService.findOne(uploadTextDto.patientUuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Patient not found');
      }
      throw error;
    }

    // Generate summary for text notes
    let summary = null;
    if (uploadTextDto.notes) {
      try {
        summary = await this.summaryService.generateSOAPSummary(
          uploadTextDto.notes,
        );
      } catch (error) {
        console.error('Summary generation failed:', error);
        // Continue without summary rather than failing the whole upload
      }
    }

    const note = this.noteRepository.create({
      patientUuid: uploadTextDto.patientUuid,
      type: NoteType.TEXT,
      s3Url: null,
      rawNotes: uploadTextDto.notes,
      summary,
      dateOfRecording: new Date(uploadTextDto.dateOfFile),
    });

    const savedNote = await this.noteRepository.save(note);
    return this.toResponseDto(savedNote);
  }

  private async toResponseDto(note: Note): Promise<NoteResponseDto> {
    const formatDateOnly = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      return new Date(date).toISOString().split('T')[0];
    };

    // Fetch the patient data
    const patient = await this.patientsService.findOne(note.patientUuid);

    return {
      uuid: note.uuid,
      patient: {
        uuid: patient.uuid,
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      },
      rawNotes: note.rawNotes,
      recordingURL: note.type === NoteType.AUDIO ? note.s3Url : null,
      transcript: note.transcription,
      summary: note.summary,
      recordingDate: formatDateOnly(note.dateOfRecording),
    };
  }
}
