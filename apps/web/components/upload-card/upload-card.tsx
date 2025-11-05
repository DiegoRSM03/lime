'use client';

import { useState } from 'react';
// Types
import { PatientResponseDto } from '@repo/api';
// Actions
import { uploadAudio, uploadText } from '@/actions/files';
// Components
import ModalAudio from '@/components/modal-audio/modal-audio';
import ModalText from '@/components/modal-text/modal-text';

interface UploadCardProps {
  patient: PatientResponseDto;
}

const UploadCard = ({ patient }: UploadCardProps) => {
  const [isOpenModalAudio, setIsOpenModalAudio] = useState(false);
  const [isOpenModalText, setIsOpenModalText] = useState(false);

  const handleUploadAudio = async (file: File) =>
    await uploadAudio(patient.uuid, file);

  const handleUploadText = async (text: string) =>
    await uploadText(patient.uuid, text);

  return (
    <div className="w-full bg-linear-to-r from-blue-950/20 to-blue-950/50 rounded-lg p-4 border border-blue-950 flex justify-between items-center">
      <ModalAudio
        isOpen={isOpenModalAudio}
        onClose={() => setIsOpenModalAudio(false)}
        onUpload={handleUploadAudio}
      />

      <ModalText
        isOpen={isOpenModalText}
        onClose={() => setIsOpenModalText(false)}
        onUpload={handleUploadText}
      />

      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">
          {patient.firstName} {patient.lastName}
        </h1>
        <p className="text-sm text-gray-500">{patient.dateOfBirth}</p>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setIsOpenModalAudio(true)}
        >
          Upload Audio
        </button>

        <button
          className="bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setIsOpenModalText(true)}
        >
          Upload Text
        </button>
      </div>
    </div>
  );
};

export default UploadCard;
