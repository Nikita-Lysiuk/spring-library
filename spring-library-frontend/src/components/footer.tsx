import { cn } from '@/lib/utils';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { socialData } from '@/constants';
import { useNavigate } from 'react-router';

interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  const navigate = useNavigate();

  const handleSocialClick = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  return (
    <footer className={cn('max-w-11/12 mx-auto pt-10', className)}>
      <div className="flex bg-[#191A23] rounded-t-3xl p-8 flex-col gap-5">
        {/*Nav part */}
        <div className="flex flex-col md:flex-row justify-between items-center m-2">
          <div className="flex flex-row items-center gap-3 p-3">
            <img src="logo.png" alt="logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-xl font-boldonse text-white">Spring-Library</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-5 md:mt-0 font-space-grotesk text-white text-lg gap-3 sm:gap-15">
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              <u>Features</u>
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              <u>Pricing</u>
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              <u>About</u>
            </ScrollLink>
          </div>
          <div className="flex flex-row items-center gap-2 p-3">
            {socialData.map((item, index) => (
              <FontAwesomeIcon
                key={index}
                icon={item.icon}
                className="text-white text-2xl rounded-full hover:bg-gray-800 p-2 cursor-pointer"
                onClick={() => handleSocialClick(item.link)}
              />
            ))}
          </div>
        </div>

        {/*Contact part */}
        <div className="flex flex-col gap-4 justify-center items-start mx-10 mt-5 font-space-grotesk text-[#f3f3f3] text-md">
          <span className="text-black text-xl bg-[#b9ff66] p-1 rounded-lg mb-4">
            Contact us:
          </span>
          <h3>Email: nikita.lisyuk06@gmail.com</h3>
          <h3>Prone: +48 693-201-532</h3>
          <h3>Address: Lublin, Poland</h3>
        </div>

        <hr className="my-5" />

        {/*Copyright part */}
        <div className="mx-10">
          <FontAwesomeIcon icon={faCopyright} className="text-white text-2xl" />
          <span className="text-[#f3f3f3] text-md ml-2 font-space-grotesk">
            2023 Spring-Library. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
