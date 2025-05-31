import {
  BookOpen,
  Store,
  Bookmark,
  Heart,
  Settings,
  LucideProps,
} from 'lucide-react';

interface ISidebarItems {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export const SidebarItems: ISidebarItems[] = [
  { title: 'Library', url: '/dashboard', icon: BookOpen },
  { title: 'Store', url: '/dashboard/books', icon: Store },
  {
    title: 'Recommendations',
    url: '/dashboard/recommendations',
    icon: Bookmark,
  },
  {
    title: 'Favorites',
    url: '#',
    icon: Heart,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export default SidebarItems;
