import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  children: (
    field: ControllerRenderProps<TFormValues, Path<TFormValues>>
  ) => React.ReactNode;
  form: UseFormReturn<TFormValues>;
}

const FieldWrapper = <TFormValues extends FieldValues>({
  name,
  label,
  children,
  form,
}: Props<TFormValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">
            {label}
          </FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage className="text-sm text-red-600" />
        </FormItem>
      )}
    />
  );
};

export default FieldWrapper;
