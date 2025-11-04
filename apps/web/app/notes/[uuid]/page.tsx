// Actions
import { getNoteByUuid } from '@/actions/notes';

const NotePage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;
  const note = await getNoteByUuid(uuid);

  console.log({ uuid, note });

  return <div>NotePage</div>;
};

export default NotePage;
