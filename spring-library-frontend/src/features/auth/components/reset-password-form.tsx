import { useModalStore } from '@/store';
import UseResetPassword from '@/features/auth/hooks/use-reset-password';
import { resetPasswordSchema } from '@/features/auth/types/authSchemas';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';

const ResetPasswordPage = () => {
  const { close, isOpen } = useModalStore();
  const { handleResetPassword } = UseResetPassword();

  const form: UseFormReturn<{ password: string; confirmPassword: string }> =
    useForm({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: { password: '', confirmPassword: '' },
    });

  const handleSubmit: SubmitHandler<{ password: string }> = async data => {
    const { password } = data;
    const token = localStorage.getItem('resetPasswordToken') || '';

    try {
      if (!token) {
        toast.error(
          'Token not found. Please request a new password reset link.'
        );
        return;
      }

      await handleResetPassword({ password, token });
      isOpen && close();
      localStorage.removeItem('resetPasswordToken');
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col p-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold">Change your password</h1>
        <p className="text-gray-400 text-base font-normal">
          Please enter your new password below.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full mt-10"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-space-grotesk">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    {...field}
                    placeholder="Enter your new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-space-grotesk">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    {...field}
                    placeholder="Confirm your new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={'default'}
            size={'lg'}
            className="w-full hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
