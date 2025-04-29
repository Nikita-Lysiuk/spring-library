import { motion, useScroll, useTransform } from 'motion/react';
import { ImageUpload, InputSection } from '@/components';
import { Button } from '@/components/ui/button';
import { useUser } from '@/features/user/hooks';
import { FormStateType } from '@/types';
import { useSetState } from 'react-use';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { data: user, isLoading } = useUser();

  const [formState, setFormState] = useSetState<FormStateType>({
    fullName: user?.fullName || '',
    email: user?.email || '',
    imageUrl: user?.avatarUrl || '/default-avatar.png',
    newImageFile: null,
  });

  useEffect(() => {
    if (user) {
      setFormState({
        fullName: user.fullName,
        email: user.email,
        imageUrl: user.avatarUrl || '/default-avatar.png',
      });
    }
  }, [user, isLoading, setFormState]);

  const handleImageChange = (file: File) => {
    setFormState({ newImageFile: file });
    const url = URL.createObjectURL(file);
    setFormState({ imageUrl: url });
  };

  const handleSave = async () => {
    // Логіка збереження даних профілю
  };

  const handleEnable2FA = async () => {
    // Логіка увімкнення 2FA
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Gradient banner */}
      <div className="bg-gradient-to-r from-blue-400 to-yellow-100 h-40 w-full absolute left-0 z-0" />

      {/* Main content */}
      <motion.div
        className="flex flex-col bg-white shadow-xl rounded-2xl p-6 sm:p-8 mt-10 mx-auto max-w-5xl w-full z-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y }}
      >
        {/* Welcome section */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {user?.fullName.split(' ')[0]}!
          </h1>
          <p className="text-lg text-gray-500 mt-2 font-space-grotesk">
            {new Date(Date.now()).toLocaleDateString('en-US', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Profile form */}
        <div className="flex flex-col gap-6">
          <ImageUpload
            fullName={user?.fullName || ''}
            email={user?.email || ''}
            imageUrl={formState.imageUrl}
            isLoading={isLoading}
            onImageChange={handleImageChange}
            className="border-b border-gray-200 pb-6"
          />
          <div className="flex flex-col sm:flex-row sm:justify-between mx-8">
            <InputSection
              formState={formState}
              setFormState={setFormState}
              isLoading={isLoading}
              handleSave={handleSave}
            />
            <div className="flex flex-col w-full md:max-w-sm">
              <Button
                variant="outline"
                size="lg"
                disabled={user?.twoFactorEnabled || isLoading}
                className="w-full max-w-md mt-6 border-indigo-300 text-indigo-600 hover:bg-indigo-50 font-space-grotesk rounded-lg"
                onClick={handleEnable2FA}
              >
                {user?.twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
