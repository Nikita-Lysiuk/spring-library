import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min?url';

GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractFirstPage = async (file: File): Promise<string | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument(arrayBuffer).promise;
    const firstPage = await pdf.getPage(1);

    const viewport = firstPage.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (!context) {
      throw new Error('Failed to get canvas context');
    }

    await firstPage.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error extracting first page:', error);
    return null;
  }
};
