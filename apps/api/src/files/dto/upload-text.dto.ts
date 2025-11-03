import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import type { UploadTextDto as IUploadTextDto } from '@repo/api';

export class UploadTextDto implements IUploadTextDto {
  @ApiProperty({
    description: 'The UUID of the patient these notes belong to',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  patientUuid: string;

  @ApiProperty({
    description: 'The text notes for the patient',
    example:
      'Patient reported feeling better after medication. No side effects observed.',
  })
  @IsNotEmpty()
  @IsString()
  notes: string;

  @ApiProperty({
    description: 'The date of the text file',
    example: '2024-01-15',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfFile: Date;
}
