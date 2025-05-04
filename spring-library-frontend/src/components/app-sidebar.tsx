import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/store';
import { Home, ShieldUser } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import sidebarItems from '@/constants/sidebar-items';
import { NavUser } from '@/components';
import { motion } from 'motion/react';

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { pathname } = useLocation();

  // Логіка активного пункту
  const getIsActive = (url: string) => {
    const currentPath = pathname.split('/').filter(Boolean).join('/');
    const targetPath = url.split('/').filter(Boolean).join('/');
    return currentPath === targetPath;
  };

  if (!user) return null;

  return (
    <Sidebar collapsible="icon" className="bg-white border-r border-gray-200">
      <SidebarHeader className="flex flex-col items-center justify-center py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <img
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="mx-auto sm:mx-0 sm:shrink-0"
              />
              <motion.h1
                className="font-space-grotesk text-xl font-bold text-emerald-600"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Spring Library
              </motion.h1>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Група Home */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-space-grotesk text-sm text-gray-500 px-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={getIsActive('/')}
                  className={cn(
                    'transition-all duration-200',
                    'hover:bg-emerald-100',
                    getIsActive('/') && 'bg-emerald-100 text-emerald-600'
                  )}
                >
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Група Dashboard */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-space-grotesk text-sm text-gray-500 px-4">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={getIsActive(item.url)}
                    className={cn(
                      'transition-all duration-200',
                      'hover:bg-emerald-100',
                      getIsActive(item.url) && 'bg-emerald-100 text-emerald-600'
                    )}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*Admin Group */}

        {user.role === 'ROLE_ADMIN' && (
          <>
            <SidebarSeparator className="my-1" />
            <SidebarGroup>
              <SidebarGroupLabel className="font-space-grotesk text-sm text-gray-500 px-4">
                Admin Panel
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={getIsActive('/dashboard/add-book')}
                      className={cn(
                        'transition-all duration-200',
                        'hover:bg-emerald-100',
                        getIsActive('/add-book') &&
                          'bg-emerald-100 text-emerald-600'
                      )}
                    >
                      <Link to="/dashboard/add-book">
                        <ShieldUser className="h-5 w-5" />
                        <span>Add Books</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
