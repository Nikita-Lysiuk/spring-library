import { Modal } from '@/features/auth/components';
import { useModalStore } from '@/store';

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, type, close } = useModalStore();

  return (
    <>
      {children}
      {isOpen && type && <Modal isOpen={isOpen} mode={type} onClose={close} />}
    </>
  );
};

export default ModalProvider;
