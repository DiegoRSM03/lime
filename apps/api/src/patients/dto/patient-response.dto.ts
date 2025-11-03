import { ApiProperty } from '@nestjs/swagger';
import type { PatientResponseDto as IPatientResponseDto } from '@repo/api';

export class PatientResponseDto implements IPatientResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the patient',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  uuid: string;

  @ApiProperty({
    description: 'The first name of the patient',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the patient',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'The date of birth of the patient',
    example: '1990-01-15',
    format: 'date',
  })
  dateOfBirth: string;

  @ApiProperty({
    description: 'When the patient record was created',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    description: 'When the patient record was last updated',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;
}
