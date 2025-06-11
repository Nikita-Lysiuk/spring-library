export type UserBookDto = {
  id: string;
  bookId: string;
  title: string;
  coverUrl: string;
  currentPage: number;
  totalPages: number;
};

export type UserBookPdfDto = {
  pdfBase64: string;
};
