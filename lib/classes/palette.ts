import { ColorPaletteElement, ColorPalette } from '@/types';
import { generateShades } from '@/utils';

export class Palette {
  private readonly STORAGE_KEY: string = 'chromaflow';
  private elements: ColorPalette;
  private styleElement: HTMLStyleElement | null = null;

  constructor(elements: ColorPalette = {}) {
    this.elements = this.loadFromCache() || elements;
    this.processElements();
    this.updateCssVariables();
  }

  get palette() {
    return this;
  }

  private processElements() {
    Object.entries(this.elements).forEach(([_, data]) => {
      if (data.isComplex && !data.shades) {
        data.shades = generateShades(data.color, data.shadeConfig);
      }
    });
  }

  private saveToCache() {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.elements)
    );
  }

  private loadFromCache(): ColorPalette | null {
    try {
      const cached = localStorage.getItem(this.STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  removeCache() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  addElement(name: string, data: ColorPaletteElement) {
    this.elements[name] = data;
    if (data.isComplex && !data.shades) {
      data.shades = generateShades(data.color, data.shadeConfig);
    }
    this.updateCssVariables();
    this.saveToCache();
  }

  removeElement(name: string) {
    if (!this.elements[name]) {
      throw new Error(`Element ${name} not founded`);
    }
    delete this.elements[name];
    this.updateCssVariables();
    this.saveToCache();
  }

  
  getElement(name: string) {
    if (!this.elements[name]) {
      throw new Error(`Element ${name} not founded`);
    }
    return this.elements[name];
  }

  getAllElements() {
    return this.elements;
  }

  getShade(name: string, shade: number) {
    const element = this.getElement(name);

    if (!element.isComplex) {
      return element.color;
    }
    if (!element.shades || !element.shades[shade]) {
      throw new Error(`Shade ${shade} not founded for element ${name}`)
    }
  }

  private generateCssVariables(): string {
    const cssVariables: string[] = [];

    Object.entries(this.elements).forEach(([name, data]) => {
      if (data.isComplex && data.shades) {
        Object.entries(data.shades).forEach(([shade, color]) => {
          cssVariables.push(`--${name}-${shade}: ${color};`)
        })
      } else {
        cssVariables.push(`--${name}: ${data.color};`)
      }
    });

    return `:root {\n ${cssVariables.join('\n ')}\n}`;;
  }

  public updateCssVariables() {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      document.head.append(this.styleElement);
    }
    this.styleElement.textContent = this.generateCssVariables();
  }
}
