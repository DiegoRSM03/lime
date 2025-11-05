import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';
import { Patient } from './patients/entities/patient.entity';
import { Note } from './files/entities/note.entity';

dotenv.config({
  debug: true,
  path: path.resolve(
    process.cwd(),
    '../../',
    process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
  ),
});

// Configure your database connection
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Patient, Note],
  synchronize: true,
});

// Mock patient data
const mockPatients = [
  { firstName: 'John', lastName: 'Doe', dateOfBirth: new Date('1980-05-15') },
  { firstName: 'Jane', lastName: 'Smith', dateOfBirth: new Date('1992-08-22') },
  {
    firstName: 'Robert',
    lastName: 'Johnson',
    dateOfBirth: new Date('1975-12-03'),
  },
];

async function seed() {
  await dataSource.initialize();
  console.log('📦 Connected to database');

  const patientRepo = dataSource.getRepository(Patient);
  const count = await patientRepo.count();

  if (count > 0) {
    console.log(`⚠️ ${count} patients already exist. Skipping seeding.`);
  } else {
    const patients = patientRepo.create(mockPatients);
    await patientRepo.save(patients);
    console.log(`✅ Seeded ${patients.length} patients successfully.`);
  }

  await dataSource.destroy();
  console.log('✅ Done.');
}

seed().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
