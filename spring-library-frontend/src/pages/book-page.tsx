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
import { useAddToCart } from '@/features/cart/hooks';
import { ErrorComponent } from '@/components';

const BookPage = () => {
  const { bookId } = useParams();
  const { addToCart } = useAddToCart(bookId as string);
  const { isLoading, data } = useBook(bookId as string);
  if (isLoading) return <LoadingSkeleton />;

  if (!data) {
    return (
      <ErrorComponent
        title="Book not found"
        description="The book you are looking for might have been removed, had its name
        changed, or is temporarily unavailable."
      />
    );
  }

  console.log('Book data:', data);

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
            onAddToCart={addToCart}
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
