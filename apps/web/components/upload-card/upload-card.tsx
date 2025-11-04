import { PatientResponseDto } from '@repo/api';

interface UploadCardProps {
  patient: PatientResponseDto;
}

const UploadCard = ({ patient }: UploadCardProps) => {
  return (
    <div className="w-full bg-linear-to-r from-blue-950/20 to-blue-950/50 rounded-lg p-4 border border-blue-950 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">
          {patient.firstName} {patient.lastName}
        </h1>
        <p className="text-sm text-gray-500">{patient.dateOfBirth}</p>
      </div>

      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          Upload Audio
        </button>

        <button className="bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Upload Text
        </button>
      </div>
    </div>
  );
};

export default UploadCard;
