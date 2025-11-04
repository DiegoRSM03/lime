'use server';

import { NoteResponseDto } from '@repo/api';

const getNotes = async () => {
  const response = await fetch(`${process.env.API_URL}/notes`);
  if (!response.ok) throw new Error('Failed to fetch notes');

  const data = await response.json();
  return data as NoteResponseDto[];
};

const getNoteByUuid = async (uuid: string) => {
  const response = await fetch(`${process.env.API_URL}/notes/${uuid}`);
  if (!response.ok) throw new Error('Failed to fetch note');

  const data = await response.json();
  return data as NoteResponseDto;
};

export { getNotes, getNoteByUuid };
