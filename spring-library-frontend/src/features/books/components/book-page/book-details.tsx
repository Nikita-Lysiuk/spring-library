import { StarRating } from '@/components';
import { languages, Review } from '@/features/books/types';
import { useMemo } from 'react';

type Category = { id: string; name: string };

interface BookDetailsProps {
  publisher?: string;
  languageValue?: string;
  hardCover?: number;
  categories?: Category[];
  reviews: Review[];
}

const BookDetails = ({
  publisher,
  languageValue,
  hardCover,
  categories = [],
  reviews = [],
}: BookDetailsProps) => {
  const language =
    languages.find(lang => lang.value === languageValue)?.label ||
    languageValue ||
    'N/A';

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }, [reviews]);

  const detailRow = (label: string, value: React.ReactNode) => (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <dt className="text-gray-500 text-sm">{label}</dt>
      <dd className="font-medium text-gray-900 text-sm max-w-[60%] text-right">
        {value || 'N/A'}
      </dd>
    </div>
  );

  return (
    <section className="max-w-xl w-full bg-white rounded-md p-6 overflow-auto">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
        Product details
      </h2>

      <dl className="divide-y divide-gray-200">
        {detailRow('Publisher', publisher)}
        {detailRow('Language', language)}
        {detailRow('Hardcover', hardCover ? `${hardCover} pages` : undefined)}
        {detailRow(
          'Categories',
          categories.length
            ? categories.map(cat => (
                <span
                  key={cat.id}
                  className="inline-block bg-gray-100 rounded px-2 py-0.5 text-xs font-semibold text-gray-700 mr-1 mb-1"
                >
                  {cat.name}
                </span>
              ))
            : 'N/A'
        )}
        {detailRow(
          'Customer Reviews',
          <div className="flex flex-row gap-2">
            <span className="text-sm text-gray-600 font-light">
              {averageRating}
            </span>
            <StarRating rating={averageRating} size={18} />
            <span className="text-sm font-light text-blue-600 underline">
              {reviews.length} ratings
            </span>
          </div>
        )}
      </dl>
    </section>
  );
};

export default BookDetails;
