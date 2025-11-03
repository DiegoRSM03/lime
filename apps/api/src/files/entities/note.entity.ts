import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

export enum NoteType {
  AUDIO = 'audio',
  TEXT = 'text',
}

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'patient_uuid' })
  patientUuid: string;

  @Column({
    type: 'enum',
    enum: NoteType,
    name: 'type',
  })
  type: NoteType;

  @Column({ name: 's3_url', nullable: true, type: 'text' })
  s3Url: string | null;

  @Column({ name: 'raw_notes', nullable: true, type: 'text' })
  rawNotes: string | null;

  @Column({
    type: 'date',
    name: 'date_of_recording',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => (value ? new Date(value + 'T00:00:00Z') : null),
    },
  })
  dateOfRecording: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_uuid' })
  patient: Patient;
}
