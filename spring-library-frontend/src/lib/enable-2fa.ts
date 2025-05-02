import { ModalType } from '@/store';

const enable2FA = async (
  handleEnable2FA: () => Promise<string | undefined>,
  setQrCodeUrl: (url: string) => void,
  open: (modalType: ModalType) => void
) => {
  const qrCodeUrl = await handleEnable2FA();

  if (!qrCodeUrl) return;

  setQrCodeUrl(qrCodeUrl);
  open('fa2Enable');
};

export default enable2FA;
