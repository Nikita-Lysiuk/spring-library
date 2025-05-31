import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/features/cart/hooks';
import { cn } from '@/lib/utils';
import { CartDrawer } from '@/features/cart/components';

interface CartButtonProps {
  className?: string;
}

const cartButton = ({ className }: CartButtonProps) => {
  const { cart, cartFetchError, isCartLoading } = useCart();

  if (cartFetchError) {
    console.error('Error fetching cart:', cartFetchError);
  }

  return (
    <CartDrawer>
      <Button
        disabled={isCartLoading}
        className={cn(
          'group relative bg-green-600/80 hover:bg-green-600',
          { 'w-[105px]': isCartLoading },
          className
        )}
      >
        <b>{cart ? cart.totalPrice.toFixed(2) : 0} $</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          <b>{cart ? cart.totalQuantity : 0}</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};

export default cartButton;
