import { extractFirstPage } from '@/lib/extract-pdf-utils';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  className?: string;
}

const DropdownFileField = <TFormValues extends FieldValues>({
  name,
  field,
  className,
}: Props<TFormValues>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [wasPreviewed, setWasPreviewed] = useState(false);

  useEffect(() => {
    if (!field.value && wasPreviewed) {
      setPreviewUrl(null);
      setFileName(null);
      setWasPreviewed(false);
    }
  }, [field.value, wasPreviewed]);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === 'application/pdf') {
        field.onChange(file);
        const url = await extractFirstPage(file);
        setPreviewUrl(url);
        setFileName(file.name);
        setWasPreviewed(true);
        return;
      }
    },
    [field]
  );

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file && file.type === 'application/pdf') {
        field.onChange(file);
        const url = await extractFirstPage(file);
        setPreviewUrl(url);
        setFileName(file.name);
        setWasPreviewed(true);
        return;
      }
    },
    [field]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className={cn('flex flex-col w-full space-y-8', className)}>
      <div
        className={`border-dashed border-2 p-4 rounded-md ${
          isDragging
            ? 'border-blue-700 bg-blue-50'
            : 'border-gray-300 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`${name}-file-input`)?.click()}
      >
        <p className="text-center text-gray-500 font-space-grotesk">
          Drag and drop a PDF file here or click to select a file
        </p>
        <input
          id={`${name}-file-input`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {previewUrl && fileName && (
        <div className="flex flex-col space-y-4">
          <p className="text-gray-700 text-xl">{fileName}</p>
          <div className="flex justify-center">
            <img
              src={previewUrl}
              alt="PDF Preview"
              className="w-56 h-auto object-cover rounded-md shadow-md"
              onClick={() => window.open(previewUrl, '_blank')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFileField;
