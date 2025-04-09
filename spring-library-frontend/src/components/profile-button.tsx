import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { User } from '@/features/auth/types';
import { Link } from 'react-router';
import { LogOut, User as UserIcon } from 'lucide-react';

interface Props {
  user: User;
  logout: () => void;
  className?: string;
}

const ProfileButton = ({ user, logout, className }: Props) => {
  return (
    <div className={cn('relative flex items-center', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer w-12 h-12 border-2 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
            <AvatarImage
              src={user.avatarUrl || '/default-avatar.png'}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-500 text-white font-semibold uppercase">
              {user.name ? user.name[0] : 'U'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-10}
          sideOffset={12}
          className="w-full m-4 bg-white border border-gray-200 shadow-lg rounded-lg p-2 space-y-1.5"
        >
          <DropdownMenuLabel className="text-xl font-medium text-gray-800">
            Hello, {user.name || 'User'}
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md transition-all"
            >
              <UserIcon className="w-5 h-5 text-gray-600" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={logout}
            className="flex items-center gap-2 px-2 py-2 text-red-600 hover:bg-red-100  rounded-md transition-all bg-red-50"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
