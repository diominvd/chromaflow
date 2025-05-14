import { ColorPaletteElement, ColorPalette } from '@/types';
import { generateShades } from '@/utils';

export class Palette {
  private elements: ColorPalette;

  constructor(elements: ColorPalette = {}) {
    this.elements = elements;
    this.processElements();
  }

  private processElements() {
    Object.entries(this.elements).forEach(([_, element]) => {
      if (element.isComplex && !element.shades) {
        element.shades = generateShades(element.color, element.shadeConfig);
      }
    });
  }

  getElement(name: string): ColorPaletteElement {
    if (!this.elements[name]) {
      throw new Error(`Element ${name} not found`);
    }
    return this.elements[name];
  }

  addElement(name: string, element: ColorPaletteElement): void {
    this.elements[name] = element;
    if (element.isComplex && !element.shades) {
      element.shades = generateShades(element.color, element.shadeConfig);
    }
  }

  removeElement(name: string): void {
    delete this.elements[name];
  }

  getAllElements(): ColorPalette {
    return this.elements;
  }

  getShade(name: string, shade: number): string {
    const element = this.getElement(name);
    if (!element.isComplex) {
      return element.color;
    }
    if (!element.shades || !element.shades[shade]) {
      throw new Error(`Shade ${shade} not found for element ${name}`);
    }
    return element.shades[shade]!;
  }

  private generateCssVariables(): string {
    const cssVariables: string[] = [];
    
    Object.entries(this.elements).forEach(([name, element]) => {
      if (element.isComplex && element.shades) {
        Object.entries(element.shades).forEach(([shade, color]) => {
          cssVariables.push(`--${name}-${shade}: ${color};`);
        });
      } else {
        cssVariables.push(`--${name}: ${element.color};`);
      }
    });

    return `:root {\n  ${cssVariables.join('\n  ')}\n}`;
  }

  injectCssVariables(): void {
    const style = document.createElement('style');
    style.textContent = this.generateCssVariables();
    document.head.appendChild(style);
  }
}
