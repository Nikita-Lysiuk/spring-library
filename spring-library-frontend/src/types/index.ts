export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export type FormStateType = {
  fullName: string;
  email: string;
  imageUrl: string;
  newImageFile: File | null;
};
