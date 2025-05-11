import { Filters } from '@/features/books/hooks/use-filters';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isMounted.current) {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('authors');
      filters.authors.forEach(a => newParams.append('authors', a));

      newParams.delete('categories');
      filters.categories.forEach(c => newParams.append('categories', c));

      newParams.delete('languages');
      filters.languages.forEach(l => newParams.append('languages', l));

      if (filters.prices.priceFrom != null) {
        newParams.set('priceFrom', filters.prices.priceFrom.toString());
      } else {
        newParams.delete('priceFrom');
      }

      if (filters.prices.priceTo != null) {
        newParams.set('priceTo', filters.prices.priceTo.toString());
      } else {
        newParams.delete('priceTo');
      }

      setSearchParams(newParams, { replace: true });
    }

    isMounted.current = true;
  }, [filters, setSearchParams]);
};

export default useQueryFilters;
