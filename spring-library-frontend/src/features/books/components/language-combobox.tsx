import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { languages } from '@/features/books/types';
import { Control, UseFormSetValue } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { BookFormValues } from '@/features/books/types';

interface Props {
  control: Control<BookFormValues>;
  setValue: UseFormSetValue<BookFormValues>;
  className?: string;
}

const LanguageCombobox = ({ control, setValue, className }: Props) => {
  return (
    <div className={className}>
      <FormField
        control={control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Language
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    role="combobox"
                    className={cn(
                      'w-full justify-between font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? languages.find(
                          language => language.value === field.value
                        )?.label
                      : 'Select a language'}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search language..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No languages found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map(language => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            setValue('language', language.value);
                          }}
                        >
                          {language.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              language.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
};

export default LanguageCombobox;
