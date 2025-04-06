import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Props {
  onClick: () => void;
  className?: string;
}

const featureBanner = ({ onClick, className }: Props) => {
  return (
    <div className={cn('mx-10 rounded-4xl bg-[#f3f3f3]', className)}>
      <div className="flex justify-center items-center p-8">
        {/* Text Content */}
        <div className="sm:w-1/2 flex flex-col sm:justify-start gap-6 sm:ml-10">
          <div className="text-start font-space-grotesk text-2xl sm:text-4xl rounded-sm p-1">
            <h3>Let's make study comfortable</h3>
            <p className="text-sm text-gray-600 mt-2 sm:w-4/6">
              Contact us today to learn more about how our digital study
              services can help you achieve your academic goals.
            </p>
          </div>
          <div className="flex justify-center sm:justify-start items-center">
            <Button
              variant={'default'}
              onClick={onClick}
              className="font-extralight text-lg sm:text-sm px-5 py-7 sm:py-6 hover:bg-gray-800 w-full sm:w-auto"
            >
              Get your free proposal
            </Button>
          </div>
        </div>

        {/* Image Content */}
        <div className="hidden sm:block w-1/2 relative h-[230px]">
          <img
            src="/Illustration.svg"
            alt="Feature Banner"
            className="absolute right-12 top-[-60px] w-[350px] h-[350px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default featureBanner;
