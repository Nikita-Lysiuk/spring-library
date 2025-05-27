import { StarRating } from '@/components';
import { Button } from '@/components/ui/button';

interface BookDescriptionProps {
  title: string;
  authors: { id: string; name: string }[];
  averageRating: number;
  reviewCount: number;
  description: string;
  price: number;
  onAddToCart?: () => void;
}

const BookDescription = ({
  title,
  authors,
  averageRating,
  reviewCount,
  description,
  price,
  onAddToCart,
}: BookDescriptionProps) => {
  return (
    <header>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-lg font-light text-gray-700 mb-4">
        by{' '}
        {authors.map((author, i) => (
          <span key={author.id}>
            <span className="text-blue-600 font-medium">{author.name}</span>
            {i < authors.length - 1 && ', '}
          </span>
        ))}
      </p>

      <div className="flex items-center gap-2">
        <StarRating rating={averageRating} />
        <span className="text-sm text-gray-600 font-light">
          {averageRating.toFixed(1)} ({reviewCount} ratings)
        </span>
      </div>

      <section className="flex flex-col gap-4 mt-4 w-36">
        <p className="text-lg font-bold text-gray-800">${price.toFixed(2)}</p>
        {onAddToCart && (
          <Button
            variant={'default'}
            className="w-full rounded-2xl bg-yellow-400 text-black-900 hover:bg-yellow-500 px-24 py-5"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </section>

      <section className="border-y-1 my-2 border-gray-300 py-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <div className="prose max-w-none text-gray-700">{description}</div>
      </section>
    </header>
  );
};

export default BookDescription;
