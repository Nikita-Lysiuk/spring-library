import { AuthForm } from '@/features/auth/components';
import { signInSchema } from '@/features/auth/types/authSchemas';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useSignIn } from '@/features/auth/hooks';
import { Link } from 'react-router';

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
        <Link to="/forgot-password">
          <h2>Forget password?</h2>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <Button variant={'outline'} size={'lg'} className="cursor-pointer">
          <Link
            to={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
            <span className="text-black ml-2">Sign in with Google</span>
          </Link>
        </Button>
        <Button variant={'outline'} size={'lg'} className="cursor-pointer">
          <Link
            to={`${import.meta.env.VITE_API_URL}/oauth2/authorization/github`}
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            <span className="text-black ml-2">Sign in with Github</span>
          </Link>
        </Button>
      </div>
    </AuthForm>
  );
};

export default SignInForm;
