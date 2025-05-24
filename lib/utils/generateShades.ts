import { HEXColor, HSLColor, ShadeConfig } from '@/types';
import { hslToHex, hexToHsl } from '@/utils';

const DEFAULT_SHADES = [0, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 99, 100];

export function generateShades(baseColor: HEXColor, config?: ShadeConfig): Record<number, HEXColor> {
  const hsl = hexToHsl(baseColor);
  const shades: Record<number, HEXColor> = {};
  
  if (!config?.steps) {
    DEFAULT_SHADES.forEach(tone => {
      let adjustedS = hsl.s;
      let adjustedL = tone;
      
      if (tone <= 40) adjustedS = Math.min(hsl.s * 1.5, 100);
      else if (tone >= 60) adjustedS = hsl.s * 0.7;
      
      if (tone >= 95) adjustedS *= 0.6;
      if (tone <= 20) adjustedS = Math.min(adjustedS * 1.8, 100);
      
      if (tone <= 40) adjustedL = 10 + tone * 0.3;
      else if (tone >= 60) adjustedL = 60 + (tone - 60) * 0.8;
      
      const newHsl: HSLColor = {
        h: hsl.h,
        s: adjustedS,
        l: adjustedL
      };

      shades[tone] = hslToHex(newHsl);
    });

    return shades;
  }

  const numberOfSteps = config.steps;
  const stepInterval = 100 / (numberOfSteps + 1);
  
  for (let i = 1; i <= numberOfSteps; i++) {
    const tone = Math.round(i * stepInterval);
    
    let adjustedS = hsl.s;
    let adjustedL = tone;
    
    if (tone <= 40) adjustedS = Math.min(hsl.s * 1.5, 100);
    else if (tone >= 60) adjustedS = hsl.s * 0.7;
    
    if (tone >= 95) adjustedS *= 0.6;
    if (tone <= 20) adjustedS = Math.min(adjustedS * 1.8, 100);
    
    if (tone <= 40) adjustedL = 10 + tone * 0.3;
    else if (tone >= 60) adjustedL = 60 + (tone - 60) * 0.8;
    
    const newHsl: HSLColor = {
      h: hsl.h,
      s: adjustedS,
      l: adjustedL
    };

    shades[tone] = hslToHex(newHsl);
  }

  return shades;
} 
