import { DataSource } from 'typeorm';
import { Patient } from './patients/entities/patient.entity';
import { Note } from './files/entities/note.entity';

// Create a standalone DataSource for seeding
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'lime_user',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'lime_db',
  entities: [Patient, Note],
  synchronize: true,
});

async function seed() {
  try {
    await dataSource.initialize();
    console.log('📊 Data Source has been initialized!');

    const patientRepository = dataSource.getRepository(Patient);

    // Check if patients already exist
    const existingCount = await patientRepository.count();
    if (existingCount > 0) {
      console.log(
        `⚠️  Database already has ${existingCount} patients. Skipping seed.`,
      );
      return;
    }

    // Mock patient data
    const mockPatients = [
      {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1980-05-15'),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: new Date('1992-08-22'),
      },
      {
        firstName: 'Robert',
        lastName: 'Johnson',
        dateOfBirth: new Date('1975-12-03'),
      },
    ];

    // Create patients
    const patients = mockPatients.map((data) => patientRepository.create(data));
    await patientRepository.save(patients);

    console.log('✅ Successfully seeded 3 mock patients!');
    console.log('Seeded patients:');
    patients.forEach((p) => {
      console.log(
        `  - ${p.firstName} ${p.lastName} (DOB: ${p.dateOfBirth.toISOString().split('T')[0]})`,
      );
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

// Run the seed function
seed();
