import { PatientResponseDto } from '@repo/api';

const getPatients = async () => {
  const response = await fetch(`${process.env.API_URL}/patients`);
  if (!response.ok) throw new Error('Failed to fetch patients');

  const data = await response.json();
  return data as PatientResponseDto[];
};

export { getPatients };
