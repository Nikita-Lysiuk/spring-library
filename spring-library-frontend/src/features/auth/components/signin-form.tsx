import { AuthForm } from '@/features/auth/components';
import { signInSchema } from '../types/authSchemas';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useSignIn } from '@/features/auth/hooks';

const SignInForm = () => {
  const { handleLogin } = useSignIn();

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: '', password: '' }}
      onSubmit={handleLogin}
    >
      <div className="flex justify-start items-center mb-4 w-1/3 text-gray-500 hover:text-gray-700 cursor-pointer">
        <h2>Forget password?</h2>
      </div>
      <div className="flex flex-col gap-3">
        <Button variant={'outline'} size={'lg'} className="">
          <FontAwesomeIcon icon={faGoogle} className="text-" />
          <span className="text-black mr-4">Sign in with Google</span>
        </Button>
        <Button variant={'outline'} size={'lg'} className="">
          <FontAwesomeIcon icon={faGithub} className="text-" />
          <span className="text-black mr-4">Sign in with Github</span>
        </Button>
      </div>
    </AuthForm>
  );
};

export default SignInForm;
