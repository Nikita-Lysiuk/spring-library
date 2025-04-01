import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { Link } from 'react-router';
import { Button } from './ui/button';
import ProfileButton from './profile-button';

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className={cn('border-b shadow-md', className)}>
      <div className="flex items-center justify-between py-5 px-10">
        {/* Logo and title*/}
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

        {/* auth buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <ProfileButton user={user} logout={logout} />
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
