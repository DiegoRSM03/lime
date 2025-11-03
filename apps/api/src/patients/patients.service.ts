import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient = this.patientRepository.create({
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
    });

    const savedPatient = await this.patientRepository.save(patient);
    return this.toResponseDto(savedPatient);
  }

  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return patients.map((patient) => this.toResponseDto(patient));
  }

  async findOne(uuid: string): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findOne({
      where: { uuid },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with UUID ${uuid} not found`);
    }

    return this.toResponseDto(patient);
  }

  async update(
    uuid: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findOne({
      where: { uuid },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with UUID ${uuid} not found`);
    }

    // Update only provided fields
    if (updatePatientDto.firstName !== undefined) {
      patient.firstName = updatePatientDto.firstName;
    }
    if (updatePatientDto.lastName !== undefined) {
      patient.lastName = updatePatientDto.lastName;
    }
    if (updatePatientDto.dateOfBirth !== undefined) {
      patient.dateOfBirth = new Date(updatePatientDto.dateOfBirth);
    }

    const updatedPatient = await this.patientRepository.save(patient);
    return this.toResponseDto(updatedPatient);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.patientRepository.delete(uuid);

    if (result.affected === 0) {
      throw new NotFoundException(`Patient with UUID ${uuid} not found`);
    }
  }

  private toResponseDto(patient: Patient): PatientResponseDto {
    // Handle both Date objects and strings from database
    const formatDate = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    };

    const formatDateOnly = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      // If it's already a date string (YYYY-MM-DD), return as is
      if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      return new Date(date).toISOString().split('T')[0];
    };

    return {
      uuid: patient.uuid,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: formatDateOnly(patient.dateOfBirth),
      createdAt: formatDate(patient.createdAt),
      updatedAt: formatDate(patient.updatedAt),
    };
  }
}
