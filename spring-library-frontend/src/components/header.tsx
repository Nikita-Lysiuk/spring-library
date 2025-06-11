import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { ProfileButton } from '@/components';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useLogout } from '@/features/auth/hooks';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  const { isAuthenticated, user, logout, accessToken, refreshToken } =
    useAuthStore();
  const { handleLogout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      if (!accessToken || !refreshToken) {
        throw new Error('Tokens are missing');
      }

      await handleLogout({ accessToken, refreshToken });
      toast.success('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      logout();
      navigate('/', { replace: true });
    }
  };

  return (
    <header className={cn('border-b shadow-md', className)}>
      <div className="flex items-center justify-between py-5 px-10">
        {/* Logo and title */}
        <Link to="/">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="mx-auto sm:mx-0 sm:shrink-0"
            />
            <div>
              <h1 className="text-xl uppercase font-boldonse">
                Spring-library
              </h1>
              <p className="text-sm text-gray-500 leading-3">
                comfort education
              </p>
            </div>
          </div>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="sm:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center justify-between gap-15">
          <nav className="flex items-end gap-8 font-space-grotesk text-md">
            <Link
              to="/dashboard/books"
              className="hover:text-gray-500 cursor-pointer"
            >
              Store
            </Link>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              Pricing
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              About us
            </ScrollLink>
          </nav>

          <span className="hidden sm:block text-gray-500 text-2xl">|</span>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <ProfileButton user={user} logout={onSubmit} />
            ) : (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-gray-500"
                  asChild
                >
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <span className="text-gray-500">or</span>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-gray-500"
                  asChild
                >
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col items-center gap-5 py-5 bg-gray-100">
          <nav className="flex flex-col items-center gap-4 font-space-grotesk text-md">
            <Link
              to="/dashboard/books"
              className="hover:text-gray-500 cursor-pointer"
            >
              Store
            </Link>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              Pricing
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-gray-500 cursor-pointer"
            >
              About us
            </ScrollLink>
          </nav>

          <div className="flex flex-col items-center gap-3">
            {isAuthenticated && user ? (
              <ProfileButton user={user} logout={onSubmit} />
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-gray-500"
                asChild
              >
                <Link to="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
