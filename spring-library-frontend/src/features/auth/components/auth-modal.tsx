import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ModalType } from '@/store';
import { SignInForm, SignUpForm } from '@/features/auth/components';

interface AuthModalProps {
  isOpen: boolean;
  mode: ModalType;
  onClose: () => void;
}

const AuthModal = ({ isOpen, mode, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</DialogTitle>
        </DialogHeader>

        {mode === 'signIn' ? <SignInForm /> : <SignUpForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
