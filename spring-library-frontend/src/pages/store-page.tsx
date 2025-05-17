import { Skeleton } from '@/components/ui/skeleton';
import { BookCard } from '@/features/books/components';
import { useBooks } from '@/features/books/hooks';
import { useNavigate } from 'react-router';

const StorePage = () => {
  const { isLoading, data } = useBooks();
  const navigate = useNavigate();

  const handleBookClick = (id: string) => {
    navigate(`/books/${id}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-4 flex flex-col itemcs-center max-w-[200px] gap-2"
          >
            <Skeleton className="h-60 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <div className="mt-auto">
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {data && data.books.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data.books.map(book => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              coverUrl={book.coverUrl}
              publisher={book.publisher}
              averageRating={book.averageRating}
              numberOfRatings={book.numberOfRatings}
              price={book.price}
              className="w-full h-[420px]"
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default StorePage;
