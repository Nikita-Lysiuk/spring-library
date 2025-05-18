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

interface ImgSampleSectionProps {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  pdfSampleBase64: string;
  className?: string;
}

const ImgSampleSection = ({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  pdfSampleBase64,
  className,
}: ImgSampleSectionProps) => {
  const [open, setOpen] = useState(false);

  const pdfUrl = `data:application/pdf;base64,${pdfSampleBase64}`;

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
        onClick={() => setOpen(true)}
        className="w-1/2 rounded-2xl my-2"
        variant={'outline'}
      >
        Read Sample
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[650px] p-0 overflow-x-hidden overflow-y-scroll">
          <DialogHeader className="flex justify-between items-center px-4 py-4 border-b">
            <DialogTitle>PDF Sample Preview</DialogTitle>
          </DialogHeader>

          <div className="h-full">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImgSampleSection;
