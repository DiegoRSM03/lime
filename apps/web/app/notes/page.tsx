// Actions
import { getNotes } from '@/actions/notes';
// Components
import NotesGroup from '@/components/notes-group/notes-group';
import Link from 'next/link';

const Notes = async () => {
  const notes = await getNotes();
  const hasNotes = notes.length > 0;

  return (
    <main className="px-6 py-10 bg-gray-900 text-white h-full max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-5">Notes</h1>
      {hasNotes ? (
        <NotesGroup notes={notes} />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center pb-20">
          <h1 className="text-2xl font-bold mb-5">
            Oups! No notes uploaded yet
          </h1>
          <p className="text-base text-gray-500">
            Upload a note to get started. You can upload a note by clicking the
            <Link href="/upload" className="text-blue-500 mx-1">
              &quot;Upload&quot;
            </Link>
            button in the sidebar.
          </p>
        </div>
      )}
    </main>
  );
};

export default Notes;
