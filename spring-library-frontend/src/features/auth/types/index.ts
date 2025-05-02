export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
};

export type JwtAuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  is2FAEnabled?: boolean;
  userId?: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LogoutType = {
  accessToken: string;
  refreshToken: string;
};

export type ResetPasswordType = {
  password: string;
  token: string;
};

export type TwoFALoginType = {
  pin: string;
  userId: string;
};
