import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ModalType } from '@/store';
import {
  ForgotPasswordForm,
  ResetPasswordForm,
  SignInForm,
  SignUpForm,
} from '@/features/auth/components';

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
          <DialogTitle>
            {{
              signIn: 'Sign In',
              signUp: 'Sign Up',
              forgotPassword: 'Forgot Password',
              resetPassword: 'Reset Password',
            }[mode] || 'Unknown Mode'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'signIn' && <SignInForm />}
        {mode === 'signUp' && <SignUpForm />}
        {mode === 'forgotPassword' && <ForgotPasswordForm />}
        {mode === 'resetPassword' && <ResetPasswordForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
