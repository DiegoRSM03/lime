import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';

@ApiTags('patients')
@Controller('patients')
@UsePipes(new ValidationPipe({ transform: true }))
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new patient',
    description: 'Creates a new patient record with the provided information',
  })
  @ApiCreatedResponse({
    description: 'The patient has been successfully created.',
    type: PatientResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data. Check the request body for validation errors.',
  })
  async create(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<PatientResponseDto> {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all patients',
    description: 'Retrieves a list of all patients in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all patients retrieved successfully.',
    type: [PatientResponseDto],
  })
  async findAll(): Promise<PatientResponseDto[]> {
    return this.patientsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get a patient by UUID',
    description: 'Retrieves a single patient by their unique identifier',
  })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'The patient UUID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient found and returned successfully.',
    type: PatientResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patient with the specified UUID not found.',
  })
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<PatientResponseDto> {
    return this.patientsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Update a patient',
    description: "Updates an existing patient's information",
  })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'The patient UUID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully updated.',
    type: PatientResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patient with the specified UUID not found.',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data. Check the request body for validation errors.',
  })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<PatientResponseDto> {
    return this.patientsService.update(uuid, updatePatientDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a patient',
    description: 'Deletes a patient from the system',
  })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'The patient UUID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiNoContentResponse({
    description: 'The patient has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Patient with the specified UUID not found.',
  })
  async remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.patientsService.remove(uuid);
  }
}
