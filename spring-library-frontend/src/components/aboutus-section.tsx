import { cn } from '@/lib/utils';
import SectionName from './section-name';

interface Props {
  className?: string;
}

const AboutUsSection = ({ className }: Props) => {
  return (
    <section
      id="about"
      className={cn('container mx-auto px-8 lg:px-16 my-15', className)}
    >
      <SectionName
        name="Abous Us"
        description="We are a dedicated team of professionals committed to providing the
            best services for our clients. Our mission is to help you achieve
            your goals through innovative solutions and exceptional support."
      />

      <div className="flex justify-center mx-auto mt-10">
        <div className="flex w-full sm:w-3/4 px-4 py-8 sm:px-2 rounded-3xl bg-[#f3f3f3] justify-between items-center">
          <div className="hidden sm:block w-1/2">
            <img
              src="/about-us.png"
              alt="About Us"
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>

          <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-1/2 px-4 gap-10">
            <h3 className="text-2xl sm:text-4xl font-boldonse text-gray-800">
              Together for Success
            </h3>
            <p className="text-base sm:text-lg text-gray-700 font-space-grotesk">
              At Positivus, we help businesses grow by combining creativity,
              innovation, and data-driven strategies. Togetheer, we build a
              future of shared success
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
