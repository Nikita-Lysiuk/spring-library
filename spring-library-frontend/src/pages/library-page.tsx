import { ErrorComponent } from '@/components';
import { UserBookCard } from '@/features/user-books/components';
import { useGetUserBooks } from '@/features/user-books/hooks';

const LibraryPage = () => {
  const { data, isLoading, error } = useGetUserBooks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ErrorComponent
        title="We cannnot get your books. We are so sorry"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Library</h1>
      <div className="max-w-6xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map(book => <UserBookCard key={book.id} book={book} />)}
        {data?.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No books found in your library.
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
