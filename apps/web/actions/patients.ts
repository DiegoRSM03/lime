'use server';

import { PatientResponseDto } from '@repo/api';

const getPatients = async () => {
  const endpoint = `${process.env.API_URL}/patients`;
  const response = await fetch(endpoint, { cache: 'no-store' });

  if (!response.ok) throw new Error('Failed to fetch patients');

  const data = await response.json();
  return data as PatientResponseDto[];
};

export { getPatients };
