// Export your shared types and DTOs here
export type { HealthResponseDto } from './health/dto/health-response.dto';

// Patients
export type { Patient } from './patients/entities/patient.entity';
export type { CreatePatientDto } from './patients/dto/create-patient.dto';
export type { UpdatePatientDto } from './patients/dto/update-patient.dto';
export type { PatientResponseDto } from './patients/dto/patient-response.dto';

// Notes
export type { Note } from './notes/entities/note.entity';
export { NoteType } from './notes/entities/note.entity';
export type { UploadAudioDto } from './notes/dto/upload-audio.dto';
export type { UploadTextDto } from './notes/dto/upload-text.dto';
export type { NoteResponseDto } from './notes/dto/note-response.dto';
