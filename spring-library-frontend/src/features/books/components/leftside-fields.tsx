import { Input } from '@/components/ui/input';
import { cn, getInputValue } from '@/lib/utils';
import {
  LanguageCombobox,
  TagsAutoCompleteInput,
} from '@/features/books/components';
import { UseFormReturn } from 'react-hook-form';
import { Author, BookFormValues, Category } from '@/features/books/types';
import { metaTagController } from '@/features/books/api/meta-tag-controller';
import { FieldWrapper } from '@/components';

interface Props {
  form: UseFormReturn<BookFormValues>;
  className?: string;
}

const LeftsideFields = ({ form, className }: Props) => {
  return (
    <div className={cn('flex flex-col space-y-6', className)}>
      <FieldWrapper<BookFormValues> name="title" label="Title" form={form}>
        {field => (
          <Input
            placeholder="Enter book title"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            {...field}
            value={getInputValue(field.value)}
          />
        )}
      </FieldWrapper>

      <FieldWrapper<BookFormValues>
        name="publishedDate"
        label="Published Date"
        form={form}
      >
        {field => (
          <Input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            {...field}
            value={
              field.value instanceof Date
                ? field.value.toISOString().split('T')[0]
                : typeof field.value === 'string' ||
                    typeof field.value === 'number'
                  ? field.value
                  : ''
            }
            onChange={e => field.onChange(new Date(e.target.value))}
          />
        )}
      </FieldWrapper>

      <FieldWrapper<BookFormValues>
        name="publisher"
        label="Publisher"
        form={form}
      >
        {field => (
          <Input
            placeholder="Enter publisher name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            {...field}
            value={getInputValue(field.value)}
          />
        )}
      </FieldWrapper>

      <FieldWrapper<BookFormValues> name="price" label="Price" form={form}>
        {field => (
          <Input
            placeholder="Enter book price"
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            {...field}
            value={field.value ? Number(field.value) : ''}
            onChange={e => {
              const value = e.target.value;
              field.onChange(value ? parseFloat(value) : undefined);
            }}
          />
        )}
      </FieldWrapper>

      <LanguageCombobox
        control={form.control}
        setValue={form.setValue}
        className="w-full"
      />

      <FieldWrapper<BookFormValues>
        name="categories"
        label="Categories"
        form={form}
      >
        {field => (
          <TagsAutoCompleteInput<Category, BookFormValues>
            name="categories"
            fetchSuggestions={(query: string) =>
              metaTagController.categories.fetch({ query })
            }
            createTag={(name: string) =>
              metaTagController.categories.create({ name })
            }
            field={field}
            className="w-full"
          />
        )}
      </FieldWrapper>

      <FieldWrapper<BookFormValues> name="authors" label="Authors" form={form}>
        {field => (
          <TagsAutoCompleteInput<Author, BookFormValues>
            name="authors"
            fetchSuggestions={(query: string) =>
              metaTagController.authors.fetch({ query })
            }
            createTag={(name: string) =>
              metaTagController.authors.create({ name })
            }
            field={field}
            className="w-full"
          />
        )}
      </FieldWrapper>
    </div>
  );
};

export default LeftsideFields;
