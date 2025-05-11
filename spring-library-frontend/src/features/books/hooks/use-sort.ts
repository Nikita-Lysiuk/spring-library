import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

export type SortOptions =
  | 'price,asc'
  | 'price,desc'
  | 'title,asc'
  | 'title,desc'
  | 'publishedDate,asc'
  | 'publishedDate,desc';

interface ReturnProps {
  sort: SortOptions;
  setSort: (value: SortOptions) => void;
}

const useSort = (): ReturnProps => {
  const [searchParams] = useSearchParams();
  const initialSort = (searchParams.get('sort') ??
    'publishedDate,desc') as SortOptions;

  const [sort, setSort] = useState<SortOptions>(initialSort);

  return useMemo(() => ({ sort, setSort }), [sort]);
};

export default useSort;
