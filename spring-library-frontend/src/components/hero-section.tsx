import { cn } from '@/lib/utils';
import RotatingLogos from './rotating-logos';

interface Props {
  className?: string;
}

const HeroSection = ({ className }: Props) => {
  return (
    <section id="hero" className={cn('max-w-full', className)}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen gap-15 px-6 sm:px-12 md:px-20">
        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-lg text-center md:text-left">
          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
            Shaping the Future of Learning
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-7 sm:leading-8">
            A next-generation digital library designed for interactive learning.
            Read, annotate, highlight, and organize your study materials with
            ease. Transform reading into a dynamic and efficient learning
            experience.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-lg">
          <img
            src="/hero-img.png"
            alt="hero image"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Company logos */}
      <RotatingLogos />
    </section>
  );
};

export default HeroSection;
