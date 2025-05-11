import { useBooks } from '@/features/books/hooks';

const StorePage = () => {
  const books = useBooks();

  return <div>Store</div>;
};

export default StorePage;
