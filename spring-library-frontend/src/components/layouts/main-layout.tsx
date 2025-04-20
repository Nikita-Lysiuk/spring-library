import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Footer, Header } from '@/components';
import { ModalProvider } from '@/components/providers';
import { useModalStore } from '@/store';

const MainLayout = () => {
  const { isOpen } = useModalStore();

  return (
    <ModalProvider>
      <main className="min-h-screen">
        <Suspense>
          <Header />
        </Suspense>
        <Outlet />
        {!isOpen && <Footer />}
      </main>
    </ModalProvider>
  );
};

export default MainLayout;
