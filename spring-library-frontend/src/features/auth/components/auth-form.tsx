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
import toast from 'react-hot-toast';
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

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit?: (date: T) => Promise<{ success: boolean; error?: string }>;
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
  //const navigate = useNavigate();
  const isSignIn = type === 'SIGN_IN';

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async data => {
    // const { success, error } = await onSubmit?.(data);
    // if (success) {
    //   toast.success(isSignIn ? 'Login successful' : 'Registration successful');
    //   navigate('/', { replace: true });
    // } else {
    //   console.error('Error:', error);
    //   toast.error(isSignIn ? 'Login failed' : 'Registration failed');
    // }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">
        {isSignIn ? 'Welcome back!' : 'Create an account'}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? 'Continue adventure with future library.'
          : 'Join us and start your adventure.'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map(field => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>
      {children && <div className="">{children}</div>}
      <p className="text-center text-base font-medium">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}

        <Link
          to={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-green-400"
        >
          {isSignIn ? 'Create an account' : 'Sign In'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
