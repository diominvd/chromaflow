import { ColorPalette } from '@/types';

export class PaletteStyleManager {
  private static styleElement: HTMLStyleElement | null = null;

  updateStyles(elements: ColorPalette): void {
    if (!PaletteStyleManager.styleElement) {
      PaletteStyleManager.styleElement = document.createElement('style');
      document.head.append(PaletteStyleManager.styleElement);
    }

    PaletteStyleManager.styleElement.textContent = this.generateCssVariables(elements);
  }

  private generateCssVariables(elements: ColorPalette): string {
    const cssVariables: string[] = [];

    Object.entries(elements).forEach(([name, data]) => {
      if (data.isComplex && data.shades) {
        Object.entries(data.shades).forEach(([shade, color]) => {
          cssVariables.push(`--${name}-${shade}: ${color};`);
        });
      } else {
        cssVariables.push(`--${name}: ${data.color};`);
      }
    });

    return `:root {\n ${cssVariables.join('\n ')}\n}`;
  }
}
