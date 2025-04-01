import { cn } from '@/lib/utils';
import { FeatureCard } from '@/components';
import { useNavigate } from 'react-router';

interface Props {
  className?: string;
}

const FeaturesSection = ({ className }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      text: 'Search in the huge library',
      backgroundColor: '#f3f3f3',
      textColor: '#b9ff66',
      img: '/search.svg',
      alt: 'Search',
    },
    {
      text: 'Make notes and highlights',
      backgroundColor: '#b9ff66',
      textColor: '#f3f3f3',
      img: '/notes.svg',
      alt: 'Notes',
    },
    {
      text: 'Friendly inteface and easy to use',
      backgroundColor: '#b9ff66',
      textColor: '#f3f3f3',
      img: '/friendly.svg',
      alt: 'Friendly',
    },
    {
      text: 'Everything in one place',
      backgroundColor: '#f3f3f3',
      textColor: '#b9ff66',
      img: '/everything.svg',
      alt: 'Everything',
    },
  ];

  return (
    <section id="features" className={cn('max-w-full my-10', className)}>
      <div className="flex justify-start py-10 px-30">
        <div className="flex justify-between gap-10">
          <h2 className="text-3xl font-bold opacity-90 bg-[#b9ff66] text-black px-4 py-2 rounded-md">
            Features
          </h2>
          <p className="text-lg text-gray-700 max-w-lg">
            At our platform, we offer a range of features designed to enhance
            your experience. These include:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 justify-center items-center w-3/4 mx-auto">
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
    </section>
  );
};

export default FeaturesSection;
