import { cn } from '@/lib/utils';
import { ArrowBigRightDash } from 'lucide-react';

interface Props {
  text: string;
  backgroundColor: string;
  textColor: string;
  img: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const FeatureCard = ({
  text,
  backgroundColor,
  textColor,
  img,
  alt,
  className,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        'rounded-xl bg-black justify-center items-center pb-1.5',
        className
      )}
    >
      <div
        className="flex justify-between items-center p-8 rounded-xl gap-12 h-[250px]"
        style={{ background: backgroundColor }}
        onClick={onClick}
      >
        <div className="flex flex-col justify-start gap-20">
          <div
            className="text-center font-space-grotesk text-4xl sm:text-lg rounded-sm p-1"
            style={{ background: textColor }}
          >
            <h3>{text}</h3>
          </div>
          <div className="flex justify-start items-center h-auto">
            <ArrowBigRightDash className="text-black mr-2" size={30} />
            <span className="text-black text-xl font-space-grotesk">
              Get started
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center h-auto">
          <img
            src={img}
            alt={alt}
            className=" h-auto object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
