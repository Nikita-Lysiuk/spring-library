import { FeaturesSection, HeroSection } from '@/components';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default MainPage;
