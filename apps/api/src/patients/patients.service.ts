import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { Patient } from '@repo/api';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';

@Injectable()
export class PatientsService {
  // In-memory storage for patients (replace with database later)
  private patients: Map<string, Patient> = new Map();

  async create(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient: Patient = {
      uuid: uuidv4(),
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.patients.set(patient.uuid, patient);

    return this.toResponseDto(patient);
  }

  async findAll(): Promise<PatientResponseDto[]> {
    return Array.from(this.patients.values()).map((patient) =>
      this.toResponseDto(patient),
    );
  }

  async findOne(uuid: string): Promise<PatientResponseDto> {
    const patient = this.patients.get(uuid);

    if (!patient) {
      throw new NotFoundException(`Patient with UUID ${uuid} not found`);
    }

    return this.toResponseDto(patient);
  }

  async update(
    uuid: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient = this.patients.get(uuid);

    if (!patient) {
      throw new NotFoundException(`Patient with UUID ${uuid} not found`);
    }

    // Update patient fields if provided
    if (updatePatientDto.firstName !== undefined) {
      patient.firstName = updatePatientDto.firstName;
    }
    if (updatePatientDto.lastName !== undefined) {
      patient.lastName = updatePatientDto.lastName;
    }
    if (updatePatientDto.dateOfBirth !== undefined) {
      patient.dateOfBirth = new Date(updatePatientDto.dateOfBirth);
    }

    patient.updatedAt = new Date();

    this.patients.set(uuid, patient);

    return this.toResponseDto(patient);
  }

  async remove(uuid: string): Promise<void> {
    const patient = this.patients.get(uuid);

    if (!patient) {
      throw new NotFoundException(`Patient with UUID ${uuid} not found`);
    }

    this.patients.delete(uuid);
  }

  private toResponseDto(patient: Patient): PatientResponseDto {
    return {
      uuid: patient.uuid,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth.toISOString().split('T')[0], // Format as YYYY-MM-DD
      createdAt: patient.createdAt.toISOString(),
      updatedAt: patient.updatedAt.toISOString(),
    };
  }
}
