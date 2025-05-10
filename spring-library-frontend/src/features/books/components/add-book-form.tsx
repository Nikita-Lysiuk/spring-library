import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LeftsideFields, RightsideFields } from '@/features/books/components';
import { useBookForm } from '@/features/books/hooks';

const AddBookForm = () => {
  const { form, onSubmit } = useBookForm();

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
          <div className="flex justify-center mt-12">
            <Button
              type="submit"
              variant={'outline'}
              size={'lg'}
              className="hover:scale-105 transition-transform duration-200 text-lg"
            >
              Add Book
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default AddBookForm;
