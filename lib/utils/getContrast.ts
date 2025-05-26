import { getLuminance } from '@/utils';

export const getContrastColor = (hex: string): string => {
  return getLuminance(hex) > 0.5 ? '#000000' : '#ffffff';
};
