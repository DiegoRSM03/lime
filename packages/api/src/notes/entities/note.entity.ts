export enum NoteType {
  AUDIO = 'audio',
  TEXT = 'text',
}

export interface Note {
  uuid: string;
  patientUuid: string;
  type: NoteType;
  s3Url: string | null;
  rawNotes: string | null;
  transcription: string | null;
  dateOfRecording: Date;
  createdAt: Date;
  updatedAt: Date;
}
