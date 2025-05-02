import { cn } from '@/lib/utils';
import { pricingPlans } from '@/constants';
import { PricingCard, SectionName } from '@/components';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

const PricingSection = ({ className }: Props) => {
  return (
    <motion.section
      id="pricing"
      className={cn('container mx-auto px-8 lg:px-16 my-15', className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <SectionName
        name="Pricing"
        description="Elevate Your Educational Experience: Competitive Pricing for
            Exceptional Results"
      />

      {/* Pricing cards */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <PricingCard
              title={plan.title}
              price={plan.price}
              features={plan.features}
              textColor={plan.textColor}
              backgroundColor={plan.backgroundColor}
              className="cursor-pointer hover:scale-105 transition-transform duration-300 h-full sm:h-[670px]"
            />{' '}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PricingSection;
