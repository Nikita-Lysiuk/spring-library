import { cn } from '@/lib/utils';
import { pricingPlans } from '@/constants';
import { PricingCard, SectionName } from '@/components';

interface Props {
  className?: string;
}

const PricingSection = ({ className }: Props) => {
  return (
    <section
      id="pricing"
      className={cn('container mx-auto px-8 lg:px-16 my-15', className)}
    >
      <SectionName
        name="Pricing"
        description="Elevate Your Educational Experience: Competitive Pricing for
            Exceptional Results"
      />

      {/* Pricing cards */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-10">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            textColor={plan.textColor}
            backgroundColor={plan.backgroundColor}
            className="cursor-pointer hover:scale-105 transition-transform duration-300 h-full sm:h-[670px]"
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
