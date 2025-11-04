// Types
import { PatientResponseDto } from '@repo/api';
// Components
import UploadCard from '@/components/upload-card/upload-card';

interface UploadGroupProps {
  patients: PatientResponseDto[];
}

const UploadGroup = ({ patients }: UploadGroupProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {patients.map((patient) => (
        <li key={patient.uuid}>
          <UploadCard patient={patient} />
        </li>
      ))}
    </ul>
  );
};

export default UploadGroup;
