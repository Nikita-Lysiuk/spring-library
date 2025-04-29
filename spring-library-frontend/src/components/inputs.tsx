import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from './ui/input';
import { useCallback } from 'react';
import { UserPen, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  fullName: string;
  email: string;
  className?: string;
  onFullNameChange?: (name: string) => void;
  onEmailChange?: (email: string) => void;
}

const Inputs = ({
  fullName,
  email,
  className,
  onFullNameChange,
  onEmailChange,
}: Props) => {
  const handleFullNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFullNameChange?.(event.target.value);
    },
    [onFullNameChange]
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onEmailChange?.(event.target.value);
    },
    [onEmailChange]
  );

  // Анімація для полів
  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.4, ease: 'easeOut' },
    }),
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <motion.div
        className="flex flex-col gap-2 max-w-md w-full"
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Label
          htmlFor="full-name"
          className="text-sm font-medium text-gray-700"
        >
          Full Name
        </Label>
        <div className="relative w-full">
          <UserPen
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="full-name"
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Enter your full name"
            className="w-full pl-10 bg-white border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-2 max-w-md w-full"
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <div className="relative w-full">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full pl-10 bg-white border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Inputs;
