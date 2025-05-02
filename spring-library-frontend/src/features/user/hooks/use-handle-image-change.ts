import { Dispatch } from 'react';
import { FormStateType } from '@/features/user/types';

const useImageUpload = (setFormState: Dispatch<Partial<FormStateType>>) => {
  const handleImageChange = (file: File) => {
    setFormState({ newImageFile: file });
    const url = URL.createObjectURL(file);
    setFormState({ imageUrl: url });
  };

  return { handleImageChange };
};

export default useImageUpload;
