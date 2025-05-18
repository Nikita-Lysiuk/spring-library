import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

interface ReturnProps {
  page: number;
  setPage: (value: number) => void;
}

const usePage = (): ReturnProps => {
  const [searchParams] = useSearchParams();
  const initalPage = parseInt(searchParams.get('page') || '1', 10);

  const [page, setPage] = useState<number>(initalPage);

  return useMemo(() => ({ page, setPage }), [page]);
};

export default usePage;
