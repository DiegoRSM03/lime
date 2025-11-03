export interface PatientResponseDto {
  uuid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string for API responses
  createdAt: string; // ISO string for API responses
  updatedAt: string; // ISO string for API responses
}
