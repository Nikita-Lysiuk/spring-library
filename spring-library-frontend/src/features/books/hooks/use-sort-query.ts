import { useEffect, useRef } from 'react';
import { SortOptions } from './use-sort';
import { useSearchParams } from 'react-router';

const useSortQuery = (sort: SortOptions) => {
  const isMounted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isMounted.current) {
      const newParams = new URLSearchParams(searchParams);

      if (sort) {
        newParams.set('sort', sort);
      } else {
        newParams.delete('sort');
      }

      setSearchParams(newParams, { replace: true });
    }

    isMounted.current = true;
  }, [sort, setSearchParams]);
};

export default useSortQuery;
