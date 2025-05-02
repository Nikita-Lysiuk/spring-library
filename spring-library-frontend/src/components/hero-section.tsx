import { cn } from '@/lib/utils';
import { RotatingLogos } from '@/components';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

const HeroSection = ({ className }: Props) => {
  return (
    <motion.section
      id="hero"
      className={cn('max-w-full mx-auto', className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen gap-15 2xl:gap-52 px-6 sm:px-12 md:px-20">
        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-lg text-center md:text-left 2xl:max-w-2xl">
          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-black leading-tight">
            Shaping the Future of Learning
          </h1>
          <p className="text-sm sm:text-base md:text-lg 2xl:text-xl text-gray-600 leading-7 sm:leading-8">
            A next-generation digital library designed for interactive learning.
            Read, annotate, highlight, and organize your study materials with
            ease. Transform reading into a dynamic and efficient learning
            experience.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-lg 2xl:max-w-2xl mr-[-40px]">
          <img
            src="/hero-img.png"
            alt="hero image"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Company logos */}
      <RotatingLogos />
    </motion.section>
  );
};

export default HeroSection;
