import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { ChevronsUpDown, X } from 'lucide-react';
import { useState, KeyboardEvent, useCallback, useRef, useEffect } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { useDebounce } from 'react-use';
import { Tag } from '@/features/books/types';
import { ApiResponse } from '@/types';

interface Props<T extends Tag, TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  fetchSuggestions: (query: string) => Promise<ApiResponse<T[]>>;
  createTag: (name: string) => Promise<ApiResponse<T>>;
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  className?: string;
}

const TagsAutoCompleteInput = <T extends Tag, TFormValues extends FieldValues>({
  name,
  fetchSuggestions,
  createTag,
  field,
  className,
}: Props<T, TFormValues>) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useDebounce(
    async () => {
      const results = await fetchSuggestions(inputValue);
      if (results.success && results.data) {
        setSuggestions([...results.data]);
        console.log('Suggestions fetched: ', suggestions);
      } else {
        setSuggestions([]);
        console.log('Error fetching suggestions:', results.message);
      }
    },
    300,
    [inputValue, open]
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [suggestions]);

  const addTag = useCallback(
    async (tagName: string) => {
      let tag: T | undefined = suggestions.find(t => t.name === tagName);
      if (!tag) {
        const response = await createTag(tagName);
        if (response.success && response.data) {
          tag = response.data;
        } else {
          console.log('Error creating tag:', response.message);
          return;
        }
      }
      const exists = field.value?.some((t: T) => t.id === tag.id);
      if (!exists) {
        field.onChange([...field.value, tag]);
      }
      setInputValue('');
      setSuggestions([]);
    },
    [suggestions, createTag, field, setInputValue, setSuggestions]
  );

  const onKeyDown = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue) {
        e.preventDefault();
        if (inputValue.trim()) {
          await addTag(inputValue.trim());
          setOpen(false);
        }
      }
    },
    [inputValue, addTag, setOpen]
  );

  return (
    <div className={cn('flex flex-col', className)}>
      {field.value?.length > 0 && (
        <div className="flex flex-wrap gap-1 itemcs-center mb-2">
          {field.value?.map((tag: T, i: number) => (
            <div key={i} className="px-2 py-1 bg-gray-100 rounded-xl">
              <span
                onClick={() =>
                  field.onChange(field.value.filter((t: T) => t.id !== tag.id))
                }
                className="text-sm text-gray-700 cursor-pointer"
              >
                {tag.name} <X className="inline h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="text-sm text-gray-500">Select {name}...</span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command key={suggestions.map(s => s.id).join(',')}>
            <CommandInput
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={onKeyDown}
              placeholder={`Search ${name}...`}
            />
            <CommandList>
              {suggestions.length === 0 && (
                <CommandEmpty>No {name} found.</CommandEmpty>
              )}
              <CommandGroup>
                {suggestions.map((tag: T) => (
                  <CommandItem
                    key={tag.id}
                    onSelect={async () => {
                      await addTag(tag.name);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{tag.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TagsAutoCompleteInput;
