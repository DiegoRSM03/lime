import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import type { CreatePatientDto as ICreatePatientDto } from '@repo/api';

export class CreatePatientDto implements ICreatePatientDto {
  @ApiProperty({
    description: 'The first name of the patient',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the patient',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The date of birth of the patient',
    example: '1990-01-15',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;
}
