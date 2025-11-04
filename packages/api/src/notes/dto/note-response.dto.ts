export interface NoteResponseDto {
  uuid: string;
  patientUuid: string;
  type: 'audio' | 'text';
  s3Url: string | null;
  rawNotes: string | null;
  transcription: string | null;
  dateOfRecording: string; // ISO string for API responses
  createdAt: string; // ISO string for API responses
  updatedAt: string; // ISO string for API responses
}
