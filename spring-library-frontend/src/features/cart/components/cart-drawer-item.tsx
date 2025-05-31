import * as CartItem from '@/features/cart/components/cart-items-details';
import { cn } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';

interface CartDrawerItemProps {
  id: string;
  coverImageUrl: string;
  title: string;
  price: number;
  onClickRemoveButton?: (bookId: string) => void;
  className?: string;
}

const CartDrawerItem = ({
  id,
  coverImageUrl,
  title,
  price,
  onClickRemoveButton,
  className,
}: CartDrawerItemProps) => {
  return (
    <div
      className={cn(
        'flex items-start bg-white rounded-xl shadow-sm px-4 py-5 gap-4 transition hover:shadow-md',
        className
      )}
    >
      <CartItem.Image
        src={coverImageUrl}
        className="w-20 h-28 object-cover rounded-md"
      />

      <div className="flex-1 flex flex-col justify-between">
        <CartItem.Info name={title} className="font-light text-gray-800" />

        <div className="mt-4 flex items-center justify-between">
          <CartItem.Price
            value={price}
            className="font-semibold text-gray-700"
          />

          <button
            onClick={() => onClickRemoveButton?.(id)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition group"
          >
            <Trash2Icon
              size={18}
              className="text-gray-400 group-hover:text-red-500 transition"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
