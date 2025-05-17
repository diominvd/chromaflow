/**
 * Calculates the relative brightness of a color
 * @param hexColor
 * @returns number from 0 to 1, where 0 - black, 1 - white
 */
export const getLuminance = (hexColor: string): number => {
  const hex = hexColor.replace('#', '');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}; 