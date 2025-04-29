export type FetchUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  twoFactorEnabled: boolean;
};
