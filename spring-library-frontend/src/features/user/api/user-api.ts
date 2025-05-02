import { axiosInstance } from '@/lib';
import { ApiResponse } from '@/types';
import {
  Disable2FAType,
  FA2EnableResponse,
  FetchUser,
  UpdateUserType,
  validate2FAType,
} from '@/features/user/types';

export const fetchUser = async (
  token: string
): Promise<ApiResponse<FetchUser>> => {
  const response = await axiosInstance.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as ApiResponse<FetchUser>;
};

export const updateUser = async (data: UpdateUserType) => {
  const { id, token, imageFile: file, ...userData } = data;

  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  Object.entries(userData).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const response = await axiosInstance.patch(`/api/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as ApiResponse;
};

export const enable2FA = async (token: string) => {
  const response = await axiosInstance.post('/api/users/enable-2fa', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as ApiResponse<FA2EnableResponse>;
};

export const disable2FA = async (data: Disable2FAType) => {
  const response = await axiosInstance.post(
    '/api/users/disable-2fa',
    { code: data.code },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data as ApiResponse;
};

export const validate2FA = async (data: validate2FAType) => {
  const response = await axiosInstance.post(
    '/api/users/validate-2fa',
    { code: data.pin },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data as ApiResponse;
};
