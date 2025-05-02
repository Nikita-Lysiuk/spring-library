import { axiosInstance } from '@/lib';
import {
  SignInType,
  SignUpType,
  JwtAuthResponse,
  LogoutType,
  ResetPasswordType,
  TwoFALoginType,
} from '@/features/auth/types';
import { ApiResponse } from '@/types';

export const signIn = async (data: SignInType): Promise<JwtAuthResponse> => {
  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data as JwtAuthResponse;
};

export const signUp = async (data: SignUpType): Promise<JwtAuthResponse> => {
  const response = await axiosInstance.post('/api/auth/register', data);
  return response.data as JwtAuthResponse;
};

export const validateToken = async (
  token: string
): Promise<{ isValid: boolean }> => {
  const response = await axiosInstance.post('/api/auth/validate-token', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<JwtAuthResponse> => {
  const response = await axiosInstance.post('/api/auth/refresh-token', {
    refreshToken,
  });
  return response.data as JwtAuthResponse;
};

export const logout = async ({
  accessToken,
  refreshToken,
}: LogoutType): Promise<string> => {
  const response = await axiosInstance.post(
    'api/auth/logout',
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data as string;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post('/api/auth/forgot-password', {
    email,
  });
  return response.data as ApiResponse;
};

export const resetPassword = async (data: ResetPasswordType) => {
  const response = await axiosInstance.post('/api/users/reset-password', data);
  return response.data as ApiResponse;
};

export const send2FACode = async (
  data: TwoFALoginType
): Promise<JwtAuthResponse> => {
  const response = await axiosInstance.post('/api/auth/2fa-login', data);
  return response.data as JwtAuthResponse;
};
