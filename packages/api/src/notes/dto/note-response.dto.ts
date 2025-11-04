import { PatientResponseDto } from 'patients/dto/patient-response.dto';

export interface NoteResponseDto {
  uuid: string;
  patient: PatientResponseDto;
  s3Url: string | null;
  rawNotes: string | null;
  transcription: string | null;
  summary: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  } | null;
  recordingDate: string; // ISO string for API responses
  recordingURL: string | null;
  createdAt: string; // ISO string for API responses
  updatedAt: string; // ISO string for API responses
}
