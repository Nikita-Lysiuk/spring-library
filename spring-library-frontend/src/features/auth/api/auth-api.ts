import { axiosInstance } from '@/lib';

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

export const signIn = async (data: SignInType) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data as { token: string };
};

export const signUp = async (data: SignUpType) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data as { token: string };
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error('Email already exists');
    }
    throw new Error('An error occurred during registration');
  }
};

export const validateToken = async (token: string) => {
  const response = await axiosInstance.post(
    '/auth/validate-token',
    { token },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data as { isValid: boolean };
};

// TODO: Add a hook to handle the logout process.
export const logout = async (token: string) => {
  const response = await axiosInstance.post('/auth/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as { success: boolean };
};

// TODO: Add a hook to handle the password reset process.
export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data as { success: boolean; message: string };
};

// TODO: Add a hook to handle the o2auth google process.
export const signInWithGoogle = async () => {
  const response = await axiosInstance.get('/auth/google');
  return response.data as { token: string };
};

// TODO: Add a hook to handle the o2auth github process.
export const signInWithGithub = async () => {
  const response = await axiosInstance.get('/auth/github');
  return response.data as { token: string };
};
