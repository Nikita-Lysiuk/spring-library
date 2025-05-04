import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInputValue = (val: any): string | number =>
  typeof val === 'string' || typeof val === 'number' ? val : '';
