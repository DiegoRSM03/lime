import Link from 'next/link';
// Types
import { NoteResponseDto } from '@repo/api';

interface NoteCardProps {
  note: NoteResponseDto;
}

const DATE_FORMAT = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
} as const;

const NoteCard = ({ note }: NoteCardProps) => {
  const { patient, summary } = note;
  const noteType = note.recordingURL ? 'audio' : 'text';

  const frieldyDate = new Date(note.recordingDate).toLocaleDateString(
    'en-US',
    DATE_FORMAT,
  );

  return (
    <Link href={`/notes/${note.uuid}`} className="w-full h-max">
      <div className="w-full bg-linear-to-r from-blue-950/20 to-blue-950/50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-5">
            <p className="text-sm text-gray-300 font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
            <p className="text-xs text-gray-400">{frieldyDate}</p>
          </div>

          <div className="text-xs text-gray-50 bg-blue-800 px-2 py-1 rounded-sm">
            {noteType}
          </div>
        </div>

        {summary ? (
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-xs text-gray-400">Subjective</span>
              <p className="text-sm text-gray-300">{summary?.subjective}</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Objective</span>
              <p className="text-sm text-gray-300">{summary?.objective}</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Assessment</span>
              <p className="text-sm text-gray-300">{summary?.assessment}</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Plan</span>
              <p className="text-sm text-gray-300">{summary?.plan}</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No summary available</div>
        )}
      </div>
    </Link>
  );
};

export default NoteCard;
