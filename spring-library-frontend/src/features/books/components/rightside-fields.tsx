import { UseFormReturn } from 'react-hook-form';
import { BookFormValues } from '@/features/books/types';
import { cn, getInputValue } from '@/lib/utils';
import { FieldWrapper } from '@/components';
import { Textarea } from '@/components/ui/textarea';
import DropdownFileField from './dropdown-file-field';

interface Props {
  form: UseFormReturn<BookFormValues>;
  className?: string;
}

const RightsideFields = ({ form, className }: Props) => {
  return (
    <div className={cn('flex flex-col space-y-6', className)}>
      <FieldWrapper name="description" label="Description" form={form}>
        {field => (
          <Textarea
            placeholder="Enter book description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
            rows={6}
            {...field}
            value={getInputValue(field.value)}
          />
        )}
      </FieldWrapper>

      <FieldWrapper<BookFormValues>
        name="pdf"
        label="Upload pdf here"
        form={form}
      >
        {field => (
          <DropdownFileField<BookFormValues>
            name="pdf"
            field={field}
            className="w-full"
          />
        )}
      </FieldWrapper>
    </div>
  );
};

export default RightsideFields;
