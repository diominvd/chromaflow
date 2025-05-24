import { PaletteStorage } from './PaletteStorage.ts';
import { PaletteStyleManager } from './PaletteStyleManager.ts';
import { PaletteValidator } from './PaletteValidator.ts';
import { ColorPaletteElement, ColorPalette } from '@/types';
import { generateShades } from '@/utils';

export class Palette {
  private elements: ColorPalette = {};
  private storage: PaletteStorage;
  private styleManager: PaletteStyleManager;

  constructor(elements: ColorPalette = {}) {
    this.storage = new PaletteStorage();
    this.styleManager = new PaletteStyleManager();

    if (Object.keys(elements).length > 0) {
      PaletteValidator.validateElements(elements);
      this.elements = { ...elements };
      this.storage.save(this.elements);
    } else {
      this.elements = this.storage.load() || {};
    }
    this.processElements();
    this.styleManager.updateStyles(this.elements);
  }

  private processElements(): void {
    Object.entries(this.elements).forEach(([_, data]) => {
      if (data.isComplex && !data.shades) {
        data.shades = generateShades(data.color, data.shadeConfig);
      }
    });
  }

  addElement(name: string, data: ColorPaletteElement): void {
    if (!PaletteValidator.isValidColor(data.color)) {
      throw new Error(`Invalid color value for element ${name}`);
    }
    if (data.isComplex && data.shadeConfig && !PaletteValidator.isValidShadeConfig(data.shadeConfig)) {
      throw new Error(`Invalid shade configuration for element ${name}`);
    }

    this.elements[name] = data;
    if (data.isComplex && !data.shades) {
      data.shades = generateShades(data.color, data.shadeConfig);
    }
    this.styleManager.updateStyles(this.elements);
    this.storage.save(this.elements);
  }

  removeElement(name: string): void {
    if (!this.elements[name]) {
      throw new Error(`Element ${name} not found`);
    }
    delete this.elements[name];
    this.styleManager.updateStyles(this.elements);
    this.storage.save(this.elements);
  }

  getElement(name: string): ColorPaletteElement {
    if (!this.elements[name]) {
      throw new Error(`Element ${name} not found`);
    }
    return this.elements[name];
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
    return element.shades[shade];
  }

  hasElement(name: string): boolean {
    return name in this.elements;
  }

  clearPalette(): void {
    this.elements = {};
    this.styleManager.updateStyles(this.elements);
    this.storage.remove();
  }

  updateElements(elements: ColorPalette): void {
    PaletteValidator.validateElements(elements);
    this.elements = { ...elements };
    this.processElements();
    this.styleManager.updateStyles(this.elements);
    this.storage.save(this.elements);
  }
}
