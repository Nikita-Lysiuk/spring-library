import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { User } from '@/features/auth/types';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  exp: number;
}

export interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const persistConfig: PersistOptions<AuthStore> = {
  name: 'auth-storage',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      login: (accessToken: string, refreshToken: string) => {
        const { exp, ...userData }: DecodedToken = jwtDecode(accessToken);

        set({
          accessToken,
          refreshToken,
          user: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    persistConfig
  )
);
