import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  useCart,
  useCartItems,
  useDeleteCartItem,
} from '@/features/cart/hooks';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/features/cart/components';
import { Link } from 'react-router';
import { useState } from 'react';

const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [redirecting, setRedirecting] = useState(false);
  const { cart } = useCart();
  const { data: items } = useCartItems();
  const { deleteCartItem } = useDeleteCartItem();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-muted shadow-xl rounded-l-xl">
        <div
          className={cn(
            'flex flex-col h-full px-4 pt-6',
            !cart?.totalPrice && 'justify-center'
          )}
        >
          {cart && cart.totalPrice > 0 && (
            <SheetHeader className="mb-4">
              <SheetTitle className="text-xl text-gray-800">
                You have{' '}
                <span className="font-semibold">{items?.length} item(s)</span>{' '}
                in your cart
              </SheetTitle>
            </SheetHeader>
          )}

          {!cart?.totalPrice && (
            <div className="flex flex-col items-center text-center mx-auto max-w-xs">
              <img
                src="/empty-cart.png"
                alt="Empty Cart"
                className="w-28 h-28"
              />
              <h2 className="text-xl font-semibold text-gray-700 mt-4">
                Your cart is empty
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Add some items to start shopping
              </p>

              <SheetClose asChild>
                <Button className="w-full" size="lg" variant="outline">
                  <ArrowLeft className="w-4 mr-2" />
                  Back to menu
                </Button>
              </SheetClose>
            </div>
          )}

          {cart && cart.totalPrice > 0 && (
            <>
              <div className="overflow-y-auto flex-1 pr-1 -mr-2">
                {items?.map(item => (
                  <div key={item.bookDto.id} className="mb-3">
                    <CartDrawerItem
                      id={item.bookDto.id}
                      coverImageUrl={item.bookDto.coverImageUrl}
                      title={item.bookDto.title}
                      price={item.bookDto.price}
                      onClickRemoveButton={deleteCartItem}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="bg-white px-6 py-6 shadow-inner border-t rounded-t-lg">
                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center text-base text-gray-700">
                    <span>Total</span>
                    <span className="font-semibold text-lg">
                      {cart.totalPrice.toFixed(2)} $
                    </span>
                  </div>

                  <Link to="/place-order">
                    <Button
                      onClick={() => setRedirecting(true)}
                      disabled={redirecting}
                      size="lg"
                      className="w-full"
                    >
                      Place Order
                      <ArrowRight className="w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
