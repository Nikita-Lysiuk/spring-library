import { ImgSampleSection } from '@/features/books/components';

const BookInfo = ({
  title,
  coverImageUrl,
  pdfSampleBase64,
}: {
  title: string;
  coverImageUrl: string;
  pdfSampleBase64: string;
}) => (
  <section className="md:w-1/3 2xl:w-1/4 h-[400px] 2xl:h-1/2 flex justify-center">
    <ImgSampleSection
      imgSrc={coverImageUrl}
      imgAlt={title}
      imgWidth={250}
      imgHeight={350}
      pdfSampleBase64={pdfSampleBase64}
      className="rounded-lg shadow-lg"
    />
  </section>
);

export default BookInfo;
