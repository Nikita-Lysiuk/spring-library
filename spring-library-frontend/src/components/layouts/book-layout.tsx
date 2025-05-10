import { SearchInput } from '@/components/';
import { Outlet } from 'react-router';

const BookLayout = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Sticky пошук під Dashboard header */}
      <header className="sticky z-20 bg-white pb-4 flex justify-between items-center border-b">
        <div className="flex-1 flex justify-center">
          <SearchInput className="max-w-lg w-full" />
        </div>
        <div className="flex items-end gap-2 mx-6">
          <span>Sort by</span>
        </div>
      </header>

      {/* Основна зона з фільтрами та контентом */}
      <div className="flex flex-1 overflow-hidden gap-4 pt-4 px-4">
        <div className="w-[250px] overflow-y-auto border-r pr-4">Filters</div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BookLayout;
