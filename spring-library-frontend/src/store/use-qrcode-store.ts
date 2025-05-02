import { create } from 'zustand';

export interface QrCodeState {
  qrCodeUrl: string | null;
  setQrCodeUrl: (qrCodeUrl: string) => void;
}

export const useQrCodeStore = create<QrCodeState>(set => ({
  qrCodeUrl: null,
  setQrCodeUrl: (qrCodeUrl: string) => set({ qrCodeUrl }),
}));
