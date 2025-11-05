'use server';

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// Types
import { NoteResponseDto } from '@repo/api';

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

const getAudioUrl = async (s3Url: string) => {
  try {
    const url = new URL(s3Url);
    const bucket = url.hostname.split('.s3')[0];
    const key = url.pathname.slice(1);

    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return signedUrl;
  } catch (err) {
    console.error('Failed to create presigned URL:', err);
    throw new Error('Error generating presigned URL');
  }
};

const uploadAudio = async (patientUuid: string, file: File) => {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('patientUuid', patientUuid);
  formData.append('dateOfFile', new Date().toISOString().split('T')[0]!);

  const endpoint = `${process.env.API_URL}/files/audio`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to upload audio');

  const data = await response.json();
  return data as NoteResponseDto;
};

const uploadText = async (patientUuid: string, text: string) => {
  const payload = {
    notes: text,
    patientUuid,
    dateOfFile: new Date().toISOString().split('T')[0]!,
  };

  const endpoint = `${process.env.API_URL}/files/text`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to upload text');

  const data = await response.json();
  return data as NoteResponseDto;
};

export { getAudioUrl, uploadAudio, uploadText };
