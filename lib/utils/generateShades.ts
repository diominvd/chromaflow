import { HEXColor, HSLColor, ShadeConfig } from '@/types';
import { hslToHex } from '@/utils';
import { hexToHsl } from '@/utils';

export function generateShades(baseColor: HEXColor, config?: ShadeConfig): Record<number, HEXColor> {
  const hsl = hexToHsl(baseColor);
  const shades: Record<number, HEXColor> = {};

  const { start = 100, end = 900, step = 100 } = config || {};
  
  for (let shade = start; shade <= end; shade += step) {
    const middle = start + (end - start) / 2;
    if (Math.abs(shade - middle) < step / 2) {
      shades[shade] = baseColor;
      continue;
    }
    
    let newLightness: number;
    let newSaturation: number;

    if (shade < middle) {
      const factor = (middle - shade) / (middle - start);
      newLightness = hsl.l + factor * (100 - hsl.l);
      newSaturation = hsl.s + factor * (100 - hsl.s);
    } else {
      const factor = (shade - middle) / (end - middle);
      newLightness = hsl.l * (1 - factor);
      newSaturation = hsl.s * (1 - factor);
    }

    newLightness = Math.max(5, Math.min(95, newLightness));
    newSaturation = Math.max(5, Math.min(95, newSaturation));

    const newHsl: HSLColor = {
      h: hsl.h,
      s: newSaturation,
      l: newLightness
    };

    shades[shade] = hslToHex(newHsl);
  }

  return shades;
} 