import { HEXColor } from './colors';

export type ShadeValue = number;

export type ColorShades = {
  [key: number]: HEXColor;
};

export type ShadeConfig = {
  start: number;
  end: number;
  step: number;
};

export type ColorPaletteElement = {
  color: HEXColor;
  isComplex?: boolean;
  shades?: ColorShades;
  shadeConfig?: ShadeConfig;
};

export interface ColorPalette {
  [key: string]: ColorPaletteElement;
}
