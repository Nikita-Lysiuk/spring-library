import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  ratingNumber?: number;
  className?: string;
}

const StarRating = ({
  rating,
  max = 5,
  size = 24,
  ratingNumber,
  className,
}: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div
            key={i}
            className={cn('relative', className)}
            style={{ width: size, height: size }}
          >
            <Star size={size} strokeWidth={1} className="text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden text-yellow-400"
              style={{
                width: `${fillPercent}%`,
                height: '100%',
              }}
            >
              <Star size={size} strokeWidth={1} fill="currentColor" />
            </div>
          </div>
        );
      })}

      {ratingNumber !== null && (
        <span className="font-light text-gray-500 ml-1">{ratingNumber}</span>
      )}
    </div>
  );
};

export default StarRating;
