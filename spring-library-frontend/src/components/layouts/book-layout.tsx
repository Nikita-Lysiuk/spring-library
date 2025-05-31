import { Filters, SearchInput, SortByButton } from '@/components';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { CartButton } from '@/features/cart/components';

const BookLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-20 bg-white pb-4 flex justify-between items-center border-b px-4 flex-col lg:flex-row space-y-4 lg:space-y-0">
        <div className="flex-1 flex justify-center">
          <SearchInput className="max-w-lg w-full mt-2" />
        </div>
        <div className="flex items-end mt-2">
          <div className="flex flex-col gap-2">
            <CartButton className="ml-auto" />
            <SortByButton />
          </div>
          <div className="block lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[250px] p-4 overflow-y-auto"
              >
                <Suspense>
                  <Filters />
                </Suspense>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden gap-4 pt-4 px-5">
        <div className="hidden lg:block w-[250px] overflow-y-auto shrink-0">
          <Suspense>
            <Filters />
          </Suspense>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BookLayout;
