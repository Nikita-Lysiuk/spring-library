import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface Props {
  title: string;
  price: number;
  features: string[];
  textColor: string;
  backgroundColor: string;
  className?: string;
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

const PricingCard = ({
  title,
  price,
  features,
  textColor,
  backgroundColor,
  className,
  onGetStarted,
  onLearnMore,
}: Props) => {
  const buttonColor = textColor === 'white' ? '#b9ff66' : '#000000';

  return (
    <div
      className={cn('flex flex-col rounded-xl p-4 w-full', className)}
      style={{
        border: `1px solid ${buttonColor}`,
        background: backgroundColor,
        color: textColor,
      }}
    >
      <div className="flex flex-col justify-center items-start mx-2 mb-5 py-2">
        <h3 className="text-start text-[28px] font-inria-sans-regular">
          {title}
        </h3>
        <h2 className="text-start text-4xl font-space-grotesk mt-5">
          ${price} <span className="text-base font-normal">/month</span>
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-5 my-5 px-1">
        <Button
          variant={'default'}
          size={'lg'}
          style={{ background: buttonColor }}
          className="flex py-8 w-full text-xl font-space-grotesk hover:scale-105 duration-300"
          onClick={onGetStarted}
        >
          <span style={{ color: backgroundColor }}>Get Started</span>
        </Button>
        <Button
          variant={'outline'}
          size={'lg'}
          style={{ background: backgroundColor }}
          className="flex py-6 w-full text-lg font-space-grotesk hover:scale-105 duration-300"
          onClick={onLearnMore}
        >
          <span style={{ color: textColor }}>learn More</span>
        </Button>
      </div>

      <hr
        className={`border-t-2 ${textColor === 'white' ? 'border-white' : 'border-black'} rounded-2xl opacity-75`}
      />

      {/* Features list */}
      <div className="flex flex-col gap-4 my-10 mx-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-row justify-start gap-4 items-start"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#b9ff66] p-1">
              <Check className="text-black opacity-90" />
            </span>
            <span className="text-md font-space-grotesk opacity-65">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
