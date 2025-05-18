import { useSearchBook } from '@/features/books/hooks';
import { SearchBook } from '@/features/books/types';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
  className?: string;
}

const SearchInput = ({ className }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [books, setBooks] = useState<SearchBook[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { data, isError } = useSearchBook(searchQuery);

  useClickAway(ref, () => setFocused(false));
  useDebounce(
    async () => {
      if (!isError && data) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setBooks([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-sm outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Find book ..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        {books.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl p-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {books.map(book => (
              <Link
                onClick={onClickItem}
                key={book.id}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg"
                to={`/dashboard/books/${book.id}`}
              >
                <img
                  className="w-8 h-auto"
                  src={`${book.coverUrl}`}
                  alt={book.title}
                />
                <span>{book.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
