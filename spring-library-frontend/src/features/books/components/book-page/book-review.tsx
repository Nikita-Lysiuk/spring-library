import { Button } from '@/components/ui/button';
import { useReviewForm } from '../../hooks';
import { Review } from '../../types';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface BookReviewProps {
  reviews: Review[];
  bookId: string;
  className?: string;
}

const Star: FC<{ filled: boolean; onClick?: () => void }> = ({
  filled,
  onClick,
}) => (
  <svg
    onClick={onClick}
    className={cn(
      'w-5 h-5 cursor-pointer',
      filled ? 'text-yellow-400' : 'text-gray-300'
    )}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.963c.3.921-.755 1.688-1.54 1.118l-3.385-2.454a1 1 0 00-1.175 0l-3.385 2.454c-.784.57-1.838-.197-1.54-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.034 9.39c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.963z" />
  </svg>
);

export const BookReview = ({ reviews, bookId, className }: BookReviewProps) => {
  const { form, onSubmit } = useReviewForm(bookId);
  const rating = form.watch('rating');

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <section
      className={cn(
        'max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6',
        className
      )}
    >
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: Review Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Your rating:</label>
            <div className="flex space-x-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    filled={i < rating}
                    onClick={() => form.setValue('rating', i + 1)}
                  />
                ))}
            </div>
            {form.formState.errors.rating && (
              <p className="text-sm text-red-500 mt-1">Rating is required</p>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="block font-medium mb-1">
              Your review (optional):
            </label>
            <textarea
              id="comment"
              {...form.register('comment')}
              className="w-full p-2 border rounded-md text-sm"
              rows={4}
              placeholder="Write your review..."
            />
          </div>

          <Button type="submit" variant="outline" className="font-semibold">
            Submit Review
          </Button>
        </form>

        {/* RIGHT: Review List */}
        <div>
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} filled={i < Math.round(averageRating)} />
                ))}
            </div>
            <span className="ml-2 text-gray-700 font-semibold text-lg">
              {averageRating.toFixed(1)}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
            {!reviews.length && (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
            {reviews.map(review => (
              <div key={review.id} className="border-b pb-2">
                <div className="flex mb-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} filled={i < review.rating} />
                    ))}
                </div>
                <p className="text-sm text-gray-700 mb-1">{review.content}</p>
                <time
                  className="text-xs text-gray-400"
                  dateTime={review.createdAt}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookReview;
