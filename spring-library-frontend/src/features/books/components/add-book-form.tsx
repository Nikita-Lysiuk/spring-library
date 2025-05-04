import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { bookSchema } from '@/features/books/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeftsideFields, RightsideFields } from '@/features/books/components';

const AddBookForm = () => {
  // Винести в useBookForm
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      publishedDate: undefined,
      publisher: '',
      pdf: undefined,
      language: 'en',
      price: 0,
      categories: [],
      authors: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    console.log('Form submitted:', data);
    // Handle form submission logic here, such as sending data to an API
  };

  return (
    <Form {...form}>
      <div className="container mx-auto px-8 py-6 flex w-full flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="flex flex-col md:flex-row md:space-x-24 space-y-4 md:space-y-0 justify-center">
            <div className="flex-1 max-w-sm">
              <LeftsideFields form={form} />
            </div>
            <div className="flex-1 max-w-sm md:max-w-lg">
              <RightsideFields form={form} />
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default AddBookForm;
