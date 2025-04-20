import { cn } from '@/lib/utils';

interface Props {
  name: string;
  description: string;
  className?: string;
}

const SectionName = ({ name, description, className }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row justify-start items-center sm:items-start py-10 px-4 sm:px-10 gap-6 sm:gap-10',
        className
      )}
    >
      <div className="flex justify-between gap-10">
        <h2 className="text-2xl sm:text-3xl font-bold opacity-90 bg-[#b9ff66] text-black px-4 py-2 rounded-md h-full">
          {name}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 max-w-full sm:max-w-lg text-center sm:text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionName;
