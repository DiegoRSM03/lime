// Actions
import { getPatients } from '@/actions/patients';
// Components
import UploadGroup from '@/components/upload-group/upload-group';

const Upload = async () => {
  const patients = await getPatients();
  const hasPatients = patients.length > 0;

  return (
    <main className="px-6 py-10 bg-gray-900 text-white h-full">
      <h1 className="text-2xl font-bold mb-5">Upload</h1>
      {hasPatients ? (
        <UploadGroup patients={patients} />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center pb-20">
          <h1 className="text-2xl font-bold mb-5">Oups! No patients found</h1>
          <p className="text-base text-gray-500">
            It seems like you don&apos;t have any patients yet. Please create a
            patient first.
          </p>
        </div>
      )}
    </main>
  );
};

export default Upload;
