import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import { Button } from '@/components/ui/button';
import { useAuthStore, useModalStore } from '@/store';
import toast from 'react-hot-toast';
import { JwtAuthResponse } from '@/features/auth/types';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (date: T) => Promise<{
    success: boolean;
    error?: string;
    tokens: JwtAuthResponse | undefined;
  }>;
  type: 'SIGN_IN' | 'SIGN_UP';
  children?: React.ReactNode;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
  children,
}: Props<T>) => {
  const navigate = useNavigate();
  const isSignIn = type === 'SIGN_IN';
  const { close, isOpen } = useModalStore();
  const { login, setUserId } = useAuthStore();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async data => {
    const { success, error, tokens } = await onSubmit(data);
    if (tokens?.is2FAEnabled && tokens?.userId) {
      setUserId(tokens.userId);
      isOpen && close();
      navigate('/2fa');
    } else if (success && tokens?.accessToken && tokens?.refreshToken) {
      toast.success(isSignIn ? 'Login successful' : 'Registration successful');
      isOpen && close();
      login(tokens.accessToken, tokens.refreshToken);
      navigate('/dashboard', { replace: true });
    } else {
      console.error('AuthForm Error:', error);
      const errorMessage = isSignIn
        ? 'Invalid email or password'
        : error || 'An error occurred during registration';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-black">
        {isSignIn ? 'Welcome back!' : 'Create an account'}
      </h1>
      <p className="text-gray-400 text-base font-medium">
        {isSignIn
          ? 'Continue adventure with future library.'
          : 'Join us and start your adventure.'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-3 w-full"
        >
          {Object.keys(defaultValues).map(field => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-space-grotesk text-gray-700">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="w-full py-5 mt-2 hover:translate-y-1 transition-all duration-200 cursor-pointer"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>
      {children && <div>{children}</div>}
      <p className="text-center text-base font-medium">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}

        <Link
          to={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-green-400"
        >
          {isSignIn ? ' Create an account' : ' Sign In'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
