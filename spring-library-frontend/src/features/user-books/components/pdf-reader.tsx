import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useGetBookPdf } from '@/features/user-books/hooks';
import { NotesSidebar } from '@/features/user-books/components';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfReaderProps {
  bookId: string;
  currentPage: number;
  setNewCurrentPage?: (page: number) => void;
}

const PdfReader = ({
  bookId,
  currentPage,
  setNewCurrentPage,
}: PdfReaderProps) => {
  const [pageNumber, setPageNumber] = useState(currentPage);
  const [numPages, setNumPages] = useState<number | null>(null);
  const { data: bookPdf, isLoading } = useGetBookPdf(bookId);

  const [inputValue, setInputValue] = useState(String(pageNumber + 1));

  useEffect(() => {
    setInputValue(String(pageNumber + 1));
  }, [pageNumber]);

  // Sync pageNumber with setNewCurrentPage
  useEffect(() => {
    if (setNewCurrentPage && pageNumber !== currentPage) {
      setNewCurrentPage(pageNumber);
    }
  }, [pageNumber, currentPage, setNewCurrentPage]);

  const goPrev = () => {
    setPageNumber(prev => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setPageNumber(prev => Math.min(prev + 1, (numPages ?? 1) - 1));
  };

  return (
    <div className="flex w-full h-full">
      {/* Notes Sidebar */}
      <NotesSidebar bookId={bookId} page={pageNumber} />

      {/* PDF Viewer Section */}
      <main className="flex-1 bg-gray-100 flex flex-col items-center justify-center relative">
        {isLoading || !bookPdf?.pdfBase64 ? (
          <div className="text-gray-500">Loading PDF...</div>
        ) : (
          <>
            <Document
              file={`data:application/pdf;base64,${bookPdf.pdfBase64}`}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="flex items-center justify-center"
            >
              <Page
                pageNumber={pageNumber + 1}
                width={300}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={1.5}
              />
            </Document>

            {/* Nav Buttons */}
            <div className="flex gap-4 mt-4 items-center">
              <Button onClick={goPrev} disabled={pageNumber === 0}>
                ← Previous
              </Button>

              <div className="flex items-center gap-2">
                <span>Page</span>
                <input
                  type="number"
                  value={inputValue}
                  min={1}
                  max={numPages ?? 1}
                  onChange={e => {
                    setInputValue(e.target.value);
                    const newPage = Number(e.target.value);
                    if (
                      !isNaN(newPage) &&
                      newPage >= 1 &&
                      newPage <= (numPages ?? 1)
                    ) {
                      setPageNumber(newPage - 1);
                    }
                  }}
                  onBlur={() => {
                    const newPage = Number(inputValue);
                    if (
                      !isNaN(newPage) &&
                      newPage >= 1 &&
                      newPage <= (numPages ?? 1)
                    ) {
                      setPageNumber(newPage - 1);
                    } else {
                      setInputValue('1');
                      setPageNumber(0);
                    }
                  }}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                />
                <span>of {numPages}</span>
              </div>

              <Button onClick={goNext} disabled={pageNumber + 1 === numPages}>
                Next →
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PdfReader;
