import { AuthForm } from '@/features/auth/components';
import { signUpSchema } from '../types/authSchemas';
import { useSignUp } from '@/features/auth/hooks';

const SignUpForm = () => {
  const { handleRegister } = useSignUp();

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
      onSubmit={handleRegister}
    />
  );
};

export default SignUpForm;
