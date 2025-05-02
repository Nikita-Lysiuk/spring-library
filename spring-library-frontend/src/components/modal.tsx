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
import { Enable2FAModal, TwoFAComponent } from '@/components';
import { useTwoFaLogin } from '@/features/auth/hooks';
import { useDisable2FA } from '@/features/user/hooks';

interface ModalProps {
  isOpen: boolean;
  mode: ModalType;
  onClose: () => void;
}

const Modal = ({ isOpen, mode, onClose }: ModalProps) => {
  const { handleTwoFALogin } = useTwoFaLogin();
  const { handleDisable2FA } = useDisable2FA();

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
              fa2Enable: 'Enabling two-factor Aunthentication',
              twoFALogin: 'Two-factor Aunthentication',
              twoFADisable: 'Disabling two-factor Aunthentication',
            }[mode] || 'Unknown Mode'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'signIn' && <SignInForm />}
        {mode === 'signUp' && <SignUpForm />}
        {mode === 'forgotPassword' && <ForgotPasswordForm />}
        {mode === 'resetPassword' && <ResetPasswordForm />}
        {mode === 'fa2Enable' && <Enable2FAModal />}
        {mode === 'twoFALogin' && (
          <TwoFAComponent handleSubmit={handleTwoFALogin} />
        )}
        {mode === 'twoFADisable' && (
          <TwoFAComponent handleSubmit={handleDisable2FA} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
