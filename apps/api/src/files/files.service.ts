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
import { NoteResponseDto } from './dto/note-response.dto';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class FilesService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private configService: ConfigService,
    private patientsService: PatientsService,
  ) {
    // Initialize S3 client
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
      // Verify patient exists
      try {
        await this.patientsService.findOne(uploadAudioDto.patientUuid);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('Patient not found');
        }
        throw error;
      }

      // Generate S3 key
      const timestamp = Date.now();
      const fileExtension = file.originalname.split('.').pop();
      const s3Key = `audio/${uploadAudioDto.patientUuid}/${timestamp}.${fileExtension}`;

      // Upload to S3
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

      // Construct S3 URL
      const s3Url = `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION', process.env.AWS_REGION)}.amazonaws.com/${s3Key}`;

      // Save to database
      const note = this.noteRepository.create({
        patientUuid: uploadAudioDto.patientUuid,
        type: NoteType.AUDIO,
        s3Url,
        rawNotes: null,

        dateOfRecording: new Date(uploadAudioDto.dateOfFile),
      });

      const savedNote = await this.noteRepository.save(note);
      return this.toResponseDto(savedNote);
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
    // Verify patient exists
    try {
      await this.patientsService.findOne(uploadTextDto.patientUuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Patient not found');
      }
      throw error;
    }

    // Save to database
    const note = this.noteRepository.create({
      patientUuid: uploadTextDto.patientUuid,
      type: NoteType.TEXT,
      s3Url: null,
      rawNotes: uploadTextDto.notes,

      dateOfRecording: new Date(uploadTextDto.dateOfFile),
    });

    const savedNote = await this.noteRepository.save(note);
    return this.toResponseDto(savedNote);
  }

  private toResponseDto(note: Note): NoteResponseDto {
    // Handle both Date objects and strings from database
    const formatDate = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    };

    const formatDateOnly = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      // If it's already a date string (YYYY-MM-DD), return as is
      if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      return new Date(date).toISOString().split('T')[0];
    };

    return {
      uuid: note.uuid,
      patientUuid: note.patientUuid,
      type: note.type,
      s3Url: note.s3Url,
      rawNotes: note.rawNotes,
      dateOfRecording: formatDateOnly(note.dateOfRecording),
      createdAt: formatDate(note.createdAt),
      updatedAt: formatDate(note.updatedAt),
    };
  }
}
