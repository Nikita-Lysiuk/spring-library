import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { User } from '../features/auth/types';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role?: string;
  exp: number;
}

export interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isTokenExpired: () => boolean;
}

const persistConfig: PersistOptions<AuthStore> = {
  name: 'auth-storage',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,

      login: async (token: string) => {
        set({ loading: true });
        try {
          // Добавити перевірку чи токен не в блеклісті
          // const isBlacklisted = await authApi.verifyToken(token);

          const { exp, ...userData }: DecodedToken = jwtDecode(token);

          set({
            token,
            user: userData,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login error:', error);
          set({ token: null, user: null, isAuthenticated: false });
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        toast.success('Logout successful');
        set({ token: null, user: null, isAuthenticated: false });
      },

      isTokenExpired: () => {
        const token = get().token;
        if (!token) return true;
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          return decodedToken.exp * 1000 < Date.now();
        } catch {
          return true;
        }
      },
    }),
    persistConfig
  )
);
