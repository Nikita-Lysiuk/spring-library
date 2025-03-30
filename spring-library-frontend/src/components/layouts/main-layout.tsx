import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuthStore, useModalStore } from '@/store';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open } = useModalStore();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    console.log(`${location.pathname}`);
    if (location.pathname === '/sign-in') {
      open('signIn');
      navigate('/', { replace: true });
    } else if (location.pathname === '/sign-up') {
      open('signUp');
      navigate('/', { replace: true });
    }
  }, [location.pathname, open, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="bg-card shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg font-bold">
            MyLibrary
          </Link>
          <div>
            {isAuthenticated ? (
              <>
                <span className="mr-4">
                  Welcome, {useAuthStore.getState().user?.email}
                </span>
                <Button onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button asChild className="mr-2">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
