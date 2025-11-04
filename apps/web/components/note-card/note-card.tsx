import Link from 'next/link';
// Components
import AudioPlayer from '@/components/audio-player/audio-player';
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
  const { patient } = note;
  const noteType = note.recordingURL ? 'audio' : 'text';

  const frieldyDate = new Date(note.recordingDate).toLocaleDateString(
    'en-US',
    DATE_FORMAT,
  );

  return (
    <Link href={`/notes/${note.uuid}`} className="w-full h-max">
      <div className="w-full bg-linear-to-r from-blue-950/20 to-blue-950/50 rounded-lg p-4 border border-blue-950">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-300 font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
            <p className="text-xs text-gray-400">{frieldyDate}</p>
          </div>

          <div className="text-xs text-gray-50 bg-blue-800/30 px-2 py-1 rounded-sm">
            {noteType}
          </div>
        </div>

        {noteType === 'audio' ? (
          <div className="flex flex-col justify-center items-start gap-2">
            <span className="text-sm text-gray-400">Uploaded Audio</span>
            <AudioPlayer url={note.recordingURL as string} className="w-1/3" />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-start gap-2">
            <span className="text-sm text-gray-400">Raw Notes</span>
            <p className="text-sm text-gray-300">{note.rawNotes}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NoteCard;
