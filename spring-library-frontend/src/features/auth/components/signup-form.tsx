import { AuthForm } from '@/features/auth/components';
import { signUpSchema } from '../types/authTypes';

const SignUpForm = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
    />
  );
};

export default SignUpForm;
