import { Textarea } from '@/components/ui/textarea';
import { useNote } from '@/features/user-books/hooks';

const NotesSidebar = ({ bookId, page }: { bookId: string; page: number }) => {
  const {
    text,
    handleChange,
    isLoading: isNoteLoading,
    isSaving,
  } = useNote({ bookId, page });

  return (
    <aside className="w-64 border-r bg-white p-4 flex flex-col">
      <h2 className="text-md font-semibold mb-2">Notes for page {page + 1}</h2>
      <Textarea
        placeholder="Write your notes..."
        value={text}
        onChange={e => handleChange(e.target.value)}
        disabled={isNoteLoading}
        className="flex-1 resize-none"
      />
      {isSaving && <span className="text-xs text-gray-500">Saving...</span>}
    </aside>
  );
};

export default NotesSidebar;
