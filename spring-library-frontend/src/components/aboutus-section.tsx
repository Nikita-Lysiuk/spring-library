import { cn } from '@/lib/utils';
import SectionName from './section-name';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

const AboutUsSection = ({ className }: Props) => {
  // Варіанти анімацій для SectionName
  const sectionNameVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Варіанти анімацій для контейнера
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 80,
      },
    },
  };

  // Варіанти анімацій для зображення
  const imageVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Варіанти анімацій для текстового блоку
  const textVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <motion.section
      id="about"
      className={cn('container mx-auto px-8 lg:px-16 my-15', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={sectionNameVariants}>
        <SectionName
          name="About Us"
          description="We are a dedicated team of professionals committed to providing the best services for our clients. Our mission is to help you achieve your goals through innovative solutions and exceptional support."
        />
      </motion.div>

      <motion.div
        className="flex justify-center mx-auto mt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex w-full sm:w-3/4 px-4 py-8 sm:px-2 rounded-3xl bg-[#f3f3f3] justify-between items-center">
          <motion.div
            className="hidden sm:block w-1/2"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <img
              src="/about-us.png"
              alt="About Us"
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center items-center sm:items-start w-full sm:w-1/2 px-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
              className="text-2xl sm:text-4xl font-boldonse text-gray-800"
              custom={0}
              variants={textVariants}
            >
              Together for Success
            </motion.h3>
            <motion.p
              className="text-base sm:text-lg text-gray-700 font-space-grotesk"
              custom={1}
              variants={textVariants}
            >
              At Positivus, we help businesses grow by combining creativity,
              innovation, and data-driven strategies. Together, we build a
              future of shared success
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutUsSection;
