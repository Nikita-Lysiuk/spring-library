import { AuthForm } from '@/features/auth/components';
import { signInSchema } from '../types/authTypes';

const SignInForm = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: '', password: '' }}
    />
  );
};

export default SignInForm;
