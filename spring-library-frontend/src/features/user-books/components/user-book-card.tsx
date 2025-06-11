import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { UserBookDto } from '@/features/user-books/types';
import { ArrowRight } from 'lucide-react';
import PdfReader from './pdf-reader';
import { useState } from 'react';
import { useUpdateCurrentPage } from '../hooks';

interface UserBookCardProps {
  book: UserBookDto;
}

const UserBookCard = ({ book }: UserBookCardProps) => {
  const progress = (book.currentPage / book.totalPages) * 100;
  const [newCurrentPage, setNewCurrentPage] = useState(book.currentPage);
  const updateCurrentPageMutation = useUpdateCurrentPage();

  const handleUpdateProgress = (page: number) => {
    updateCurrentPageMutation.mutate({
      bookId: book.bookId,
      newCurrentPage: page,
    });
  };

  return (
    <Card className="relative w-full max-w-sm shadow-lg rounded-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center justify-center p-4 min-h-[120px] h-84">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-40 h-56 object-cover rounded-md shadow-sm"
        />
        <CardTitle
          className="text-center text-lg font-semibold mt-4 text-gray-800"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3rem',
          }}
        >
          {book.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative p-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Dialog
          onOpenChange={open => {
            if (!open) {
              handleUpdateProgress(newCurrentPage);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="absolute top-[24px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-full shadow-lg w-12 h-12 transition-transform duration-200 group-hover:scale-110"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[1400px] w-full h-[90vh] p-0  rounded-xl">
            <PdfReader
              bookId={book.bookId}
              currentPage={book.currentPage}
              setNewCurrentPage={setNewCurrentPage}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserBookCard;
