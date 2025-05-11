import { useSort, useSortQuery } from '@/features/books/hooks';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { sortOptionsMap } from '@/constants';
import { SortOptions } from '@/features/books/hooks/use-sort';

interface Props {
  className?: string;
}

const SortByButton = ({ className }: Props) => {
  const { sort, setSort } = useSort();
  useSortQuery(sort);

  const sortText = sortOptionsMap[sort].label || 'Sort by';

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'}>{sortText}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-1 mr-2">
          <div className="flex flex-col gap-2">
            {Object.entries(sortOptionsMap).map(([key, value]) => (
              <Button
                key={key}
                variant={sort === key ? 'default' : 'outline'}
                onClick={() => {
                  setSort(key as SortOptions);
                }}
                className="w-full justify-start"
              >
                <value.icon className="w-4 h-4 mr-2" />
                {value.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SortByButton;
