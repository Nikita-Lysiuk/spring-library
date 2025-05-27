import { ImgSampleSection } from '@/features/books/components';

interface BookInfoProps {
  bookId: string;
  title: string;
  coverImageUrl: string;
}

const BookInfo = ({ bookId, title, coverImageUrl }: BookInfoProps) => (
  <section className="md:w-1/3 2xl:w-1/4 h-[400px] 2xl:h-1/2 flex justify-center">
    <ImgSampleSection
      imgSrc={coverImageUrl}
      imgAlt={title}
      imgWidth={250}
      imgHeight={350}
      pdfSampleBase64={''}
      className="rounded-lg shadow-lg"
    />
  </section>
);

export default BookInfo;
