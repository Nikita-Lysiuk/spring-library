import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useModalStore } from '@/store';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/features/auth/types/authSchemas';
import { useForgotPassword } from '@/features/auth/hooks';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPasswordForm = () => {
  const { close, isOpen } = useModalStore();
  const { handleForgotPassword } = useForgotPassword();

  const form: UseFormReturn<{ email: string }> = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit: SubmitHandler<{ email: string }> = async data => {
    const { email } = data;

    try {
      await handleForgotPassword(email);
      isOpen && close();
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col p-2">
      <div className="flex flex-col justify-center items-center my-10 gap-2">
        <FontAwesomeIcon icon={faLock} className="text-8xl text-gray-800" />
        <h1 className="text-2xl font-bold mt-5">Forgot Password?</h1>
        <p className="text-gray-400 text-base font-normal">
          You can reset your password here.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-space-grotesk text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input required type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={'default'}
            size={'lg'}
            className="w-full bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Send my Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
