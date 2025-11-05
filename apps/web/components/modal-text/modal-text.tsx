'use client';
import { useState } from 'react';
// Components
import Modal from '@/components/modal/modal';

interface ModalTextProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (text: string) => void;
}

const ModalText = ({ isOpen, onClose, onUpload }: ModalTextProps) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleUpload = () => {
    if (text) {
      onUpload(text);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">Upload Text</h1>
      <p className="text-sm text-gray-500">
        Upload a text file to the patient.
      </p>
      <textarea
        className="w-full h-60 p-2 rounded-md border border-gray-700 bg-gray-800 text-white mb-4 outline-none resize-none mt-1"
        placeholder="Enter your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <button
        disabled={!text}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
        onClick={handleUpload}
      >
        Upload text to patient
      </button>
    </Modal>
  );
};

export default ModalText;
