import {
  AboutUsSection,
  FeaturesSection,
  HeroSection,
  PricingSection,
} from '@/components';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <AboutUsSection />
    </div>
  );
};

export default MainPage;
