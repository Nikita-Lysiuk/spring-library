import { StarRating } from '@/components';
import { cn } from '@/lib/utils';

interface BookCardProps {
  id: string;
  title: string;
  coverUrl: string;
  publisher: string;
  averageRating: number;
  numberOfRatings: number;
  price: number;
  className?: string;
  onClick?: (id: string) => void;
}

const BookCard = ({
  id,
  title,
  coverUrl,
  publisher,
  averageRating,
  numberOfRatings,
  price,
  className,
  onClick,
}: BookCardProps) => {
  return (
    <div
      className={cn('flex flex-col items-center', className)}
      onClick={() => onClick && onClick(id)}
    >
      <div className="p-4 flex flex-col itemcs-center max-w-[200px] cursor-pointer">
        <img
          src={coverUrl}
          alt={title}
          className="w-42 h-auto rounded-lg cursor-pointer"
        />
        <h3 className="text-md font-semibold mt-2">{title}</h3>
        <p className="text-sm text-gray-500">{publisher}</p>
        <StarRating
          rating={averageRating}
          ratingNumber={numberOfRatings}
          size={20}
          className="mt-1"
        />
        <p className="text-md text-orange-500 font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default BookCard;
