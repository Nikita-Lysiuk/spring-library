import { useParams } from 'react-router';
import { useBook } from '@/features/books/hooks';
import {
  BookDescription,
  BookDetails,
  BookInfo,
  BookReview,
  BookStats,
  LoadingSkeleton,
} from '@/features/books/components';

const BookPage = () => {
  const { bookId } = useParams();
  const { isLoading, data } = useBook(bookId as string);
  if (isLoading) return <LoadingSkeleton />;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-[6rem] sm:text-[8rem] lg:text-[10rem] font-space-grotesk font-bold leading-none">
          <span className="text-yellow-400">404</span>
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-gray-700 mt-2">
          Book not found
        </p>
        <p className="text-sm text-gray-500 mt-1 max-w-md">
          The book you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
    );
  }

  return (
    <>
      <main
        className="
        flex flex-col md:flex-row
        min-h-screen
        px-6 py-6 sm:px-4 md:p-6 2xl:gap-56 gap-8 md:gap-24 2xl:py-20
        bg-white justify-center
      "
      >
        <BookInfo
          bookId={data.id}
          title={data.title}
          coverImageUrl={data.coverImageUrl}
        />
        <article className="md:w-1/2 2xl:w-1/3 flex flex-col gap-6">
          <BookDescription
            title={data.title}
            authors={data.authors}
            averageRating={data.averageRating}
            reviewCount={data.reviewCount}
            description={data.description}
            price={data.price}
            onAddToCart={() => {
              console.log('Add to cart clicked');
            }}
          />
          <BookStats
            publisher={data.publisher}
            publishedDate={data.publishedDate}
            language={data.language}
            pageCount={data.pageCount}
          />
        </article>
      </main>
      <section className="container mx-auto px-4 py-6 border-t">
        <BookDetails
          publisher={data.publisher}
          languageValue={data.language}
          hardCover={data.pageCount}
          categories={data.categories}
          averageRating={data.averageRating}
          reviewCount={data.reviewCount}
        />
      </section>
      <section className="container mx-auto py-6 border-t">
        <BookReview bookId={data.id} />
      </section>
    </>
  );
};

export default BookPage;
