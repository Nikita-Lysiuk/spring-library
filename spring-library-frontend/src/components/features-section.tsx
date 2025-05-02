import { cn } from '@/lib/utils';
import { FeatureBanner, FeatureCard, SectionName } from '@/components';
import { useNavigate } from 'react-router';
import { features } from '@/constants';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

const FeaturesSection = ({ className }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };

  // Варіанти анімацій для SectionName
  const sectionNameVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Варіанти анімацій для FeatureCard
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1, ease: 'easeOut' },
    }),
  };

  // Варіанти анімацій для FeatureBanner
  const bannerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="features"
      className={cn('container mx-auto px-8 lg:px-16 my-15', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={sectionNameVariants}>
        <SectionName
          name="Features"
          description="At our platform, we offer a range of features designed to enhance your experience. These include:"
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 2xl:gap-20 justify-center items-center w-full mx-auto px-4 sm:px-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <FeatureCard
              text={feature.text}
              backgroundColor={feature.backgroundColor}
              textColor={feature.textColor}
              img={feature.img}
              alt={feature.alt}
              className="cursor-pointer transition-transform duration-300"
              onClick={handleClick}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-15 sm:mt-20"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <FeatureBanner onClick={handleClick} className="w-full" />
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
