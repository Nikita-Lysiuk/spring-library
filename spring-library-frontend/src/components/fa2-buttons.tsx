import { Button } from '@/components/ui/button';
import { useEnable2FA } from '@/features/user/hooks';
import { useQrCodeStore } from '@/store/use-qrcode-store';
import { useModalStore } from '@/store/use-modal-store';
import { FetchUser } from '@/features/user/types';
import { cn } from '@/lib/utils';
import { enable2FA } from '@/lib';

interface Props {
  user: FetchUser | undefined;
  isLoading: boolean;
  className?: string;
}

const FA2Buttons = ({ user, isLoading, className }: Props) => {
  const { handleEnable2FA } = useEnable2FA();
  const { setQrCodeUrl } = useQrCodeStore();
  const { open } = useModalStore();

  return (
    <div className={cn('flex flex-col w-full md:max-w-sm', className)}>
      {!user?.twoFactorEnabled ? (
        <Button
          variant="outline"
          size="lg"
          disabled={user?.twoFactorEnabled || isLoading}
          className="w-full max-w-md mt-6 border-indigo-300 text-indigo-600 hover:bg-indigo-50 font-space-grotesk rounded-lg"
          onClick={() => enable2FA(handleEnable2FA, setQrCodeUrl, open)}
        >
          Enable 2FA
        </Button>
      ) : (
        <Button
          variant="outline"
          size="lg"
          disabled={!user?.twoFactorEnabled || isLoading}
          className="w-full max-w-md mt-6 bg-red-500/50 hover:bg-red-500/70 font-space-grotesk rounded-lg"
          onClick={() => open('twoFADisable')}
        >
          Disable 2FA
        </Button>
      )}
    </div>
  );
};

export default FA2Buttons;
