import { usePage, usePageQuery } from '@/features/books/hooks';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface CustomPaginationProps {
  totalPages: number;
  className?: string;
}

const generatePageNumbers = (page: number, total: number) => {
  const pages: (number | 'dots')[] = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (page <= 3) {
      pages.push(1, 2, 3, 'dots', total);
    } else if (page >= total - 2) {
      pages.push(1, 'dots', total - 2, total - 1, total);
    } else {
      pages.push(1, 'dots', page - 1, page, page + 1, 'dots', total);
    }
  }

  return pages;
};

const CustomPagination = ({ totalPages, className }: CustomPaginationProps) => {
  const { page, setPage } = usePage();
  usePageQuery(page);

  const pages = generatePageNumbers(page, totalPages);

  return (
    <div className={className}>
      {totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {pages.map((p, idx) => (
                <PaginationItem key={idx}>
                  {p === 'dots' ? (
                    <span className="px-2 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      variant={p === page ? 'default' : 'ghost'}
                      className="h-8 px-3 text-sm"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  className={
                    page === totalPages ? 'pointer-events-none opacity-50' : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
