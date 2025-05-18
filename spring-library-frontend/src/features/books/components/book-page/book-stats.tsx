import { BookOpen, Building, Calendar, Languages } from 'lucide-react';
import { languages } from '@/features/books/types';

const BookStats = ({
  publisher,
  publishedDate,
  language,
  pageCount,
}: {
  publisher: string;
  publishedDate: string;
  language: string;
  pageCount: number;
}) => {
  const stats = [
    {
      label: 'Publisher',
      Icon: Building,
      value: publisher || 'N/A',
    },
    {
      label: 'Publication date',
      Icon: Calendar,
      value: publishedDate
        ? new Date(publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'N/A',
    },
    {
      label: 'Language',
      Icon: Languages,
      value:
        languages.find(lang => lang.value === language)?.label ||
        language ||
        'N/A',
    },
    {
      label: 'Print length',
      Icon: BookOpen,
      value: pageCount ? `${pageCount} pages` : 'N/A',
    },
  ];

  return (
    <section className="flex flex-wrap justify-between gap-4 mt-2">
      {stats.map(({ label, Icon, value }) => (
        <div
          key={label}
          className="flex flex-col items-center w-32 text-center text-gray-700"
        >
          <Icon className="mb-1 text-gray-500" size={20} />
          <span className="text-sm font-light">{label}</span>
          <span className="font-semibold">{value}</span>
        </div>
      ))}
    </section>
  );
};

export default BookStats;
