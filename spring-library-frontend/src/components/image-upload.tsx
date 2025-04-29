import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useCallback, useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  fullName: string;
  email: string;
  imageUrl: string;
  isLoading: boolean;
  className?: string;
  onImageChange?: (file: File) => void;
}

const ImageUpload = ({
  fullName,
  email,
  imageUrl,
  isLoading,
  className,
  onImageChange,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        onImageChange?.(file);
        return () => URL.revokeObjectURL(url);
      } else {
        console.error('Invalid file type. Please upload an image.');
      }
    },
    [onImageChange]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        onImageChange?.(file);
        return () => URL.revokeObjectURL(url);
      } else {
        console.error('Please drop a valid image file');
      }
    },
    [onImageChange]
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
    <div className={cn('container mx-auto mt-4', className)}>
      {isLoading ? (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center w-full">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col ml-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>

          <Skeleton className="h-10 w-32" />
        </div>
      ) : (
        <div
          className={cn(
            'flex flex-row items-center justify-between p-4 rounded-lg',
            isDragging && 'border-2 border-dashed border-blue-400 bg-blue-50'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="region"
          aria-label="Image upload area"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center w-full">
            <div>
              {isLoading ? (
                <Skeleton className="w-16 h-16 rounded-full" />
              ) : (
                <img
                  src={previewUrl || imageUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col ml-0 md:ml-4 mt-4 md:mt-0">
              <h1 className="text-xl font-normal text-black">{fullName}</h1>
              <p className="font-normal text-lg text-gray-400">{email}</p>
            </div>
          </div>
          <div>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Button
                variant={'outline'}
                size={'lg'}
                disabled={isLoading}
                className="flex items-center gap-2"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4" />
                  Change Image
                </span>
              </Button>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={inputRef}
                disabled={isLoading}
                aria-label="Upload profile image"
              />
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
