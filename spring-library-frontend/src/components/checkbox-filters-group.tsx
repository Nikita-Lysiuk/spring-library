import { useState } from 'react';
import {
  FilterCheckbox,
  FilterCheckboxProps,
} from '@/components/filter-checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  name?: string;
  className?: string;
}

const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = 'Search...',
  onClickCheckbox,
  selected,
  name,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const list = showAll
    ? items.filter(item =>
        item.text.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-semibold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-semibold mb-3">{title}</p>

      <AnimatePresence>
        {showAll && (
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              onChange={onChangeSearchInput}
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex flex-col gap-4 max-h-96 pr-3 overflow-auto scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {list.map((item, index) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selected?.has(item.value)}
            key={index}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {items.length > limit && (
          <motion.div
            className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-primary mt-3 cursor-pointer hover:text-primary/80 transition-colors duration-200 ease-in-out"
            >
              {showAll ? 'Show less' : 'Show more'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckboxFiltersGroup;
