import { Outlet, useLocation } from 'react-router';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import React from 'react';
import { ModalProvider } from '@/components/providers';

const DashboardLayout = () => {
  const path: string[] = useLocation().pathname.split('/').filter(Boolean);

  return (
    <ModalProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 bg-white flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <hr className="h-4 w-px bg-gray-200" />
              <Breadcrumb>
                <BreadcrumbList>
                  {path.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem className="block">
                        <BreadcrumbLink
                          href={`/${path.slice(0, index + 1).join('/')}`}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < path.length - 1 && (
                        <span className="text-gray-400">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </ModalProvider>
  );
};

export default DashboardLayout;
