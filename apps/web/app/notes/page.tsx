// Actions
import { getNotes } from '@/actions/notes';
// Components
import NotesGroup from '@/components/notes-group/notes-group';

const Notes = async () => {
  const notes = await getNotes();

  return (
    <main className="px-6 py-10 bg-gray-900 text-white h-full">
      <h1 className="text-2xl font-bold mb-5">Notes</h1>
      <NotesGroup notes={notes} />
    </main>
  );
};

export default Notes;
