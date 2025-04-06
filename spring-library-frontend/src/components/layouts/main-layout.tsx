import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useModalStore } from '@/store';
import { Footer, Header } from '@/components';
import { ModalProvider } from '@/components/providers';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open } = useModalStore();

  useEffect(() => {
    if (location.pathname === '/sign-in') {
      open('signIn');
      navigate('/', { replace: true });
    } else if (location.pathname === '/sign-up') {
      open('signUp');
      navigate('/', { replace: true });
    }
  }, [location.pathname, open, navigate]);

  return (
    <ModalProvider>
      <main className="min-h-screen">
        <Suspense>
          <Header />
        </Suspense>
        <Outlet />
        <Footer />
      </main>
    </ModalProvider>
  );
};

export default MainLayout;
