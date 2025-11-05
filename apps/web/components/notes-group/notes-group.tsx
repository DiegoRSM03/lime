// Types
import { NoteResponseDto } from '@repo/api';
// Components
import NoteCard from '@/components/note-card/note-card';

interface NotesGroupProps {
  notes: NoteResponseDto[];
}

const NotesGroup = ({ notes }: NotesGroupProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <div key={note.uuid} className="flex">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
};

export default NotesGroup;
