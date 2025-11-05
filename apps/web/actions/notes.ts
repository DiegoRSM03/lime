'use server';

import { NoteResponseDto } from '@repo/api';

const getNotes = async () => {
  const endpoint = `${process.env.API_URL}/notes`;
  const response = await fetch(endpoint, { cache: 'no-store' });

  if (!response.ok) throw new Error('Failed to fetch notes');

  const data = await response.json();
  return data as NoteResponseDto[];
};

const getNoteByUuid = async (uuid: string) => {
  const endpoint = `${process.env.API_URL}/notes/${uuid}`;
  const response = await fetch(endpoint, { cache: 'no-store' });

  if (!response.ok) throw new Error('Failed to fetch note');

  const data = await response.json();
  return data as NoteResponseDto;
};

export { getNotes, getNoteByUuid };
