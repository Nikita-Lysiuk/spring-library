import { AuthForm } from '@/features/auth/components';
import { signUpSchema } from '../types/authTypes';
import { useSignUp } from '@/features/auth/hooks';

const SignUpForm = () => {
  const { onSubmit } = useSignUp();

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={onSubmit}
    />
  );
};

export default SignUpForm;
