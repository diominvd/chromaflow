import { HEXColor } from '@/types/types';

export const copyToClipboard = async (color: HEXColor): Promise<void> => {
  try {
    await navigator.clipboard.writeText(color);
  } catch (err) {
    console.error('Failed to copy color:', err);
  }
};
