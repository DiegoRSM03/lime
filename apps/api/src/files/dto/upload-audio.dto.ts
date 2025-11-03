import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import type { UploadAudioDto as IUploadAudioDto } from '@repo/api';

export class UploadAudioDto implements IUploadAudioDto {
  @ApiProperty({
    description: 'The UUID of the patient this audio recording belongs to',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  patientUuid: string;

  @ApiProperty({
    description: 'The date of the audio file',
    example: '2024-01-15',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfFile: Date;
}
