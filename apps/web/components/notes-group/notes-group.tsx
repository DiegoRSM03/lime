// Types
import { NoteResponseDto } from '@repo/api';
// Components
import NoteCard from '@/components/note-card/note-card';

interface NotesGroupProps {
  notes: NoteResponseDto[];
}

const NotesGroup = ({ notes }: NotesGroupProps) => {
  return (
    <ul className="w-full flex flex-col gap-4">
      {notes.map((note) => (
        <li key={note.uuid} className="flex">
          <NoteCard note={note} />
        </li>
      ))}
    </ul>
  );
};

export default NotesGroup;
