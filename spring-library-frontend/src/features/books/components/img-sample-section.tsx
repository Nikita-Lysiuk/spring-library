import { cn } from '@/lib/utils';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetSample } from '@/features/books/hooks';
import toast from 'react-hot-toast';

interface ImgSampleSectionProps {
  bookId: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  className?: string;
}

const ImgSampleSection = ({
  bookId,
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  className,
}: ImgSampleSectionProps) => {
  const [open, setOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, isError } = useGetSample(bookId, shouldFetch);

  const handleOpenClick = () => {
    setShouldFetch(true);
    toast.loading('We are loading the sample for you...', {
      id: 'sample-loading',
    });
  };

  const handleClose = () => {
    setOpen(false);
    setShouldFetch(false);
  };

  const pdfUrl = data ? `data:application/pdf;base64,${data}` : '';

  if (shouldFetch && data && !open) {
    setOpen(true);
    toast.dismiss('sample-loading');
  }

  return (
    <div className={cn('flex flex-col container items-center', className)}>
      <img
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        className="rounded-sm shadow-lg mb-4"
      />

      <Button
        onClick={handleOpenClick}
        className="w-1/2 rounded-2xl my-2"
        variant={'outline'}
      >
        Read Sample
      </Button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="h-[650px] p-0 overflow-x-hidden overflow-y-scroll">
          <DialogHeader className="flex justify-between items-center px-4 py-4 border-b">
            <DialogTitle>PDF Sample Preview</DialogTitle>
          </DialogHeader>

          <div className="h-full">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                Loading...
              </div>
            ) : isError ? (
              <div className="text-red-500 text-center">
                Failed to load PDF sample.
              </div>
            ) : (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer key={bookId} fileUrl={pdfUrl} />
              </Worker>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImgSampleSection;
