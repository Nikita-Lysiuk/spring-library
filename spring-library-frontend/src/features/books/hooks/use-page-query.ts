import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

const usePageQuery = (page: number) => {
  const isMounted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isMounted.current) {
      const newParams = new URLSearchParams(searchParams);
      if (page > 1) {
        newParams.set('page', (page - 1).toString());
      } else {
        newParams.delete('page');
      }
      setSearchParams(newParams, { replace: true });
    }

    isMounted.current = true;
  }, [page, setSearchParams]);
};

export default usePageQuery;
