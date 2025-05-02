import { create } from 'zustand';

export type ModalType =
  | 'signIn'
  | 'signUp'
  | 'forgotPassword'
  | 'resetPassword'
  | 'fa2Enable'
  | 'twoFALogin'
  | 'twoFADisable';

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  open: (type: ModalType) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  type: null,

  open: (type: ModalType) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}));
