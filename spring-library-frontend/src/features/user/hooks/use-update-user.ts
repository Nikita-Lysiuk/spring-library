import { useMutation } from '@tanstack/react-query';
import { UpdateUserType } from '@/features/user/types';
import { updateUser } from '@/features/user/api/user-api';
import toast from 'react-hot-toast';

const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: (data: UpdateUserType) => updateUser(data),
    onMutate: () => {
      toast.loading('Your data is updating...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleUpdateUser = async (data: UpdateUserType) => {
    const response = await mutation.mutateAsync(data);
    response.success
      ? toast.success(response.message)
      : toast.error(response.message);

    return response.success;
  };

  return { handleUpdateUser };
};

export default useUpdateUser;
