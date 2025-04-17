import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { User } from '@/features/auth/types';
import { jwtDecode } from 'jwt-decode';
import { validateToken } from '@/features/auth/api/auth-api';

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
  isTokenExpired: (
    refreshTokenHandler: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
}

const persistConfig: PersistOptions<AuthStore> = {
  name: 'auth-storage',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
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

      isTokenExpired: async (
        refreshTokenHandler: () => Promise<{ success: boolean; error?: string }>
      ): Promise<boolean> => {
        const accessToken = get().accessToken;

        console.log('Checking if token is expired...');

        if (accessToken) {
          console.log('Validating access token...');
          try {
            const { isValid } = await validateToken(accessToken);
            if (isValid) {
              return false;
            }
          } catch (error) {
            console.error('Error validating token:', error);
          }
        }

        console.log('Access token is invalid or expired.');

        // If there is some problem with the access token, try to refresh it
        const { success, error } = await refreshTokenHandler();
        if (error) {
          console.log(`Error refreshing token: ${error}`);
        }

        return !success;
      },
    }),
    persistConfig
  )
);
