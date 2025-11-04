import { ApiProperty } from '@nestjs/swagger';
import type { NoteResponseDto as INoteResponseDto } from '@repo/api';

export class NoteResponseDto implements INoteResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the note',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  uuid: string;

  @ApiProperty({
    description: 'The UUID of the patient this note belongs to',
    example: 'e32ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  patientUuid: string;

  @ApiProperty({
    description: 'The type of note (audio or text)',
    example: 'audio',
    enum: ['audio', 'text'],
  })
  type: 'audio' | 'text';

  @ApiProperty({
    description: 'The S3 URL of the audio file (null for text notes)',
    example:
      'https://my-bucket.s3.amazonaws.com/audio/patient-uuid/recording.mp3',
    nullable: true,
  })
  s3Url: string | null;

  @ApiProperty({
    description: 'The raw text notes (null for audio notes)',
    example: 'Patient reported feeling better after medication.',
    nullable: true,
  })
  rawNotes: string | null;

  @ApiProperty({
    description: 'Transcription of audio file',
    example: 'This is the transcribed text from the audio file.',
    nullable: true,
  })
  transcription: string | null;

  @ApiProperty({
    description: 'SOAP format summary of the note',
    example: {
      subjective: 'Patient reports persistent headache for 3 days...',
      objective: 'Vital Signs: BP 130/85, HR 78, Temp 98.6°F...',
      assessment: 'Migraine headache, likely triggered by...',
      plan: '1. Prescribed sumatriptan 50mg PO...',
    },
    nullable: true,
  })
  summary: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  } | null;

  @ApiProperty({
    description: 'The date of the recording or notes',
    example: '2024-01-15',
    format: 'date',
  })
  dateOfRecording: string;

  @ApiProperty({
    description: 'When the note record was created',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    description: 'When the note record was last updated',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;
}
