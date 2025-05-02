import { FormStateType } from '@/features/user/types';
import { useAuthStore } from '@/store';

const { updateUser, user } = useAuthStore.getState();

const handleSave = async (
  accessToken: string | null,
  userId: string | undefined,
  formState: FormStateType,
  handleUpdateUser: (data: any) => Promise<boolean>
): Promise<void> => {
  if (!accessToken || !userId) return;

  const success = await handleUpdateUser({
    id: userId,
    token: accessToken,
    fullName: formState.fullName,
    email: formState.email,
    imageFile: formState.newImageFile,
  });

  updateUser({
    id: userId,
    name: formState.fullName,
    email: formState.email,
    avatarUrl: formState.imageUrl as string,
    role: user?.role!,
  });

  if (success) {
    location.reload();
  }
};

export default handleSave;
