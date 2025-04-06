import { cn } from '@/lib/utils';
import { FeatureBanner, FeatureCard, SectionName } from '@/components';
import { useNavigate } from 'react-router';
import { features } from '@/constants';

interface Props {
  className?: string;
}

const FeaturesSection = ({ className }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <section
      id="features"
      className={cn('container mx-auto px-8 lg:px-16 my-15', className)}
    >
      <SectionName
        name="Features"
        description=" At our platform, we offer a range of features designed to enhance
            your experience. These include:"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 2xl:gap-20 justify-center items-center w-full mx-auto px-4 sm:px-2">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            text={feature.text}
            backgroundColor={feature.backgroundColor}
            textColor={feature.textColor}
            img={feature.img}
            alt={feature.alt}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={handleClick}
          />
        ))}
      </div>

      <div className="flex justify-center mt-15 sm:mt-20">
        <FeatureBanner onClick={handleClick} className="w-full" />
      </div>
    </section>
  );
};

export default FeaturesSection;
