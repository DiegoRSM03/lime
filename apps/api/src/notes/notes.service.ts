import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note, NoteType } from '../files/entities/note.entity';
import { NoteResponseDto } from './dto/note-response.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<NoteResponseDto[]> {
    const notes = await this.noteRepository.find({
      relations: ['patient'],
      order: {
        createdAt: 'DESC',
      },
    });

    return notes.map((note) => this.mapNoteToResponseDto(note));
  }

  async findOne(uuid: string): Promise<NoteResponseDto> {
    const note = await this.noteRepository.findOne({
      where: { uuid },
      relations: ['patient'],
    });

    if (!note) {
      throw new NotFoundException(`Note with UUID ${uuid} not found`);
    }

    return this.mapNoteToResponseDto(note);
  }

  private mapNoteToResponseDto(note: Note): NoteResponseDto {
    return {
      uuid: note.uuid,
      patient: {
        uuid: note.patient.uuid,
        firstName: note.patient.firstName,
        lastName: note.patient.lastName,
        dateOfBirth: note.patient.dateOfBirth.toISOString().split('T')[0],
        createdAt: note.patient.createdAt.toISOString(),
        updatedAt: note.patient.updatedAt.toISOString(),
      },
      rawNotes: note.rawNotes,
      recordingURL: note.type === NoteType.AUDIO ? note.s3Url : null,
      transcript: note.transcription,
      summary: note.summary,
      recordingDate: note.dateOfRecording.toISOString().split('T')[0],
    };
  }
}
