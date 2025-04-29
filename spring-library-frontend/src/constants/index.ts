import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export { default as SidebarItems } from './sidebar-items';

export const features = [
  {
    text: 'Search in the huge library',
    backgroundColor: '#f3f3f3',
    textColor: '#b9ff66',
    img: '/search.svg',
    alt: 'Search',
  },
  {
    text: 'Make notes and highlights',
    backgroundColor: '#b9ff66',
    textColor: '#f3f3f3',
    img: '/notes.svg',
    alt: 'Notes',
  },
  {
    text: 'Friendly inteface and easy to use',
    backgroundColor: '#b9ff66',
    textColor: '#f3f3f3',
    img: '/friendly.svg',
    alt: 'Friendly',
  },
  {
    text: 'Everything in one place',
    backgroundColor: '#f3f3f3',
    textColor: '#b9ff66',
    img: '/everything.svg',
    alt: 'Everything',
  },
];

export const pricingPlans = [
  {
    title: 'Basic Plan',
    price: 500,
    features: [
      'Website optimization',
      'Social media setup and management',
      'Monthly progress reports',
      'Email support',
      'Basic competitor analysis',
      'Initial SEO audit',
    ],
    textColor: '191A23',
    backgroundColor: 'white',
  },
  {
    title: 'Pro Plan',
    price: 1000,
    features: [
      'All Basic Plan features',
      'Advanced SEO strategies',
      'Content creation and marketing',
      'Social media advertising',
      'Monthly strategy calls',
      'Custom analytics dashboard',
    ],
    textColor: 'white',
    backgroundColor: '#191A23',
  },
  {
    title: 'Elite Plan',
    price: 2000,
    features: [
      'All Pro Plan features',
      'Dedicated account manager',
      'Custom marketing strategies',
      '24/7 support',
      'Comprehensive competitor analysis',
      'Advanced analytics and reporting',
    ],
    textColor: '191A23',
    backgroundColor: 'white',
  },
];

export const socialData = [
  {
    name: 'LinkedIn',
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/nikita-lysiuk-7682b42ab/',
  },
  {
    github: 'Github',
    icon: faGithub,
    link: 'https://github.com/Nikita-Lysiuk',
  },
  {
    name: 'Twitter',
    icon: faTwitter,
    link: 'https://x.com/Nikita_Lysiuk06',
  },
];

export const FIELD_NAMES = {
  firstName: 'Fist Name',
  lastName: 'Last Name',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
};

export const FIELD_TYPES = {
  firstName: 'text',
  lastName: 'text',
  email: 'email',
  password: 'password',
  confirmPassword: 'password',
};
