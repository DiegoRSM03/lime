import { ApiProperty } from '@nestjs/swagger';
import { PatientResponseDto } from '../../patients/dto/patient-response.dto';

export class NoteResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the note',
  })
  uuid: string;

  @ApiProperty({
    type: () => PatientResponseDto,
    description: 'Patient associated with this note',
  })
  patient: PatientResponseDto;

  @ApiProperty({
    example: 'Patient presented with chest pain...',
    description: 'Raw notes text',
    nullable: true,
  })
  rawNotes: string | null;

  @ApiProperty({
    example: 'https://s3.amazonaws.com/bucket/audio/file.mp3',
    description: 'URL to the uploaded audio recording',
    nullable: true,
  })
  recordingURL: string | null;

  @ApiProperty({
    example: 'The patient presented today with complaints of chest pain...',
    description: 'Transcription of the audio note',
    nullable: true,
  })
  transcript: string | null;

  @ApiProperty({
    example: {
      subjective: 'Patient reports chest pain for 2 days',
      objective: 'Vital signs normal, no chest wall tenderness',
      assessment: 'Likely musculoskeletal pain',
      plan: 'Prescribe NSAIDs, follow up in 1 week',
    },
    description: 'SOAP note summary',
    nullable: true,
  })
  summary: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  } | null;

  @ApiProperty({
    example: '2024-01-15',
    description: 'Date of the recording or when the notes were taken',
    format: 'date',
  })
  recordingDate: string;
}
