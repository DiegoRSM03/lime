import { useState } from 'react';
// Components
import Modal from '@/components/modal/modal';

interface ModalAudioProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const ModalAudio = ({ isOpen, onClose, onUpload }: ModalAudioProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) setFile(file);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">Upload Audio</h1>
      <p className="text-sm text-gray-500">
        Upload an audio file to the patient.
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          name="audio"
          accept="audio/*"
          maxLength={30 * 1024 * 1024} // 30MB
          className="mb-4 bg-gray-800 text-white rounded-md p-2 cursor-pointer"
          onChange={handleFileChange}
        />
        <button
          disabled={!file}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleUpload}
        >
          Upload recording to patient
        </button>
      </div>
    </Modal>
  );
};

export default ModalAudio;
