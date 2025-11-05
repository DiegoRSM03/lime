import { useState } from 'react';
// Components
import Modal from '@/components/modal/modal';
// Types
import { NoteResponseDto } from '@repo/api';

interface ModalAudioProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<NoteResponseDto>;
}

const ModalAudio = ({ isOpen, onClose, onUpload }: ModalAudioProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) setFile(file);
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      await onUpload(file);
      setUploading(false);
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
          disabled={!file || uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleUpload}
        >
          {uploading ? 'Uploading...' : 'Upload recording to patient'}
        </button>
      </div>
    </Modal>
  );
};

export default ModalAudio;
