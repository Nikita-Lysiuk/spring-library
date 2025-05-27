import { StarRating } from '@/components';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ReviewCardProps {
  reviewId: string;
  rating: number;
  content?: string;
  createdAt: string;
  authorName: string;
  authorAvatarUrl?: string;
  isAllowEdit?: boolean;
  className?: string;
  onDelete?: (reviewId: string) => void;
}

const ReviewCard = ({
  reviewId,
  rating,
  content,
  createdAt,
  authorName,
  authorAvatarUrl,
  isAllowEdit = false,
  className,
  onDelete = () => {},
}: ReviewCardProps) => {
  return (
    <div className={cn('relative', className)}>
      {/* Author Info */}
      <div className="flex flex-row items-center gap-2 mb-2">
        <img
          src={authorAvatarUrl || '/default-avatar.png'}
          alt={authorName}
          className="w-6 h-6 rounded-lg"
        />
        <span className="text-sm font-semibold text-gray-800">
          {authorName}
        </span>
      </div>

      <div className="flex mb-1">
        <StarRating rating={rating} />
      </div>
      <p className="text-sm text-gray-700 mb-1">{content}</p>
      <time className="text-xs text-gray-400" dateTime={createdAt}>
        {new Date(createdAt).toLocaleDateString()}
      </time>

      {/* Delete Button */}
      {isAllowEdit && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
          onClick={() => onDelete(reviewId)}
          aria-label="Delete review"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
