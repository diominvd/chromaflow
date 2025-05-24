import { ColorPalette, ColorPaletteElement } from '@/types';

export class PaletteValidator {
  static isValidColor(color: string): boolean {
    if (typeof color !== 'string') {
      return false;
    }
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  }

  static isValidShadeConfig(config: any): boolean {
    if (!config || typeof config !== 'object') {
      return false;
    }
    
    return typeof config.steps === 'number' && config.steps > 0;
  }

  static isValidElement(data: ColorPaletteElement): boolean {
    return data && 
           typeof data === 'object' && 
           this.isValidColor(data.color) && 
           (!data.shadeConfig || this.isValidShadeConfig(data.shadeConfig));
  }

  static validateElements(elements: ColorPalette): void {
    if (!elements || typeof elements !== 'object') {
      throw new Error('Invalid palette structure');
    }

    Object.entries(elements).forEach(([name, data]) => {
      if (!this.isValidElement(data)) {
        throw new Error(`Invalid element ${name}`);
      }
    });
  }
}
