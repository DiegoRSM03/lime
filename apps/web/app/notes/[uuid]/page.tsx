// Actions
import { getNoteByUuid } from '@/actions/notes';
// Components
import AudioPlayer from '@/components/audio-player/audio-player';

const DATE_FORMAT = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
} as const;

const NotePage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;
  const note = await getNoteByUuid(uuid);
  const { patient, summary } = note;

  const frieldyDate = new Date(note.recordingDate).toLocaleDateString(
    'en-US',
    DATE_FORMAT,
  );

  return (
    <main className="px-6 py-10 bg-gray-900 text-white h-full max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-5">{`${patient.firstName} ${patient.lastName}`}</h1>

      <div className="flex flex-col gap-4 items-end mb-10">
        <div className="flex justify-start w-full items-center gap-3">
          <span className="text-sm text-gray-300">Raw Notes</span>
          <p className="text-sm text-gray-400">{frieldyDate}</p>
        </div>
        {note.rawNotes ? (
          <p className="text-base text-gray-300 w-full">{note.rawNotes}</p>
        ) : (
          <div className="text-base text-gray-500 w-full">
            No raw notes uploaded
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 items-end mb-10">
        <div className="flex justify-start w-full items-center gap-3">
          <span className="text-sm text-gray-300">Uploaded Audio</span>
        </div>
        {note.recordingURL ? (
          <AudioPlayer url={note.recordingURL} />
        ) : (
          <div className="text-base text-gray-500 w-full">
            No audio uploaded
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 items-end mb-10">
        <span className="text-sm text-gray-300 w-full">Transcript</span>
        {note.transcript ? (
          <p className="text-base text-gray-300 w-full">{note.transcript}</p>
        ) : (
          <div className="text-base text-gray-500 w-full">
            No transcript available
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start mb-10 w-full">
        <span className="text-sm text-gray-300 w-full">Summary</span>

        {summary ? (
          <div className="flex flex-col gap-4 w-full">
            <div>
              <span className="text-sm text-gray-400">Subjective</span>
              <p className="text-base text-gray-300">{summary?.subjective}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Objective</span>
              <p className="text-base text-gray-300">{summary?.objective}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Assessment</span>
              <p className="text-base text-gray-300">{summary?.assessment}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Plan</span>
              <p className="text-base text-gray-300">{summary?.plan}</p>
            </div>
          </div>
        ) : (
          <div className="text-base text-gray-500 w-full">
            No summary available
          </div>
        )}
      </div>
    </main>
  );
};

export default NotePage;
