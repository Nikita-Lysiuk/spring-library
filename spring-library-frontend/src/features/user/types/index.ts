export type FetchUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  twoFactorEnabled: boolean;
};

export type FormStateType = {
  fullName: string;
  email: string;
  imageUrl: string;
  newImageFile: File | null;
};

export type UpdateUserType = {
  id: string;
  fullName?: string;
  email?: string;
  imageFile?: File | null;
  token: string;
};

export type FA2EnableResponse = {
  qrCodeImageBase64: string;
};

export type validate2FAType = {
  token: string;
  pin: string;
};

export type Disable2FAType = {
  token: string;
  code: string;
};
