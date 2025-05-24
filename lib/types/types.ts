export type HEXColor = `#${string}`;

export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type ShadeValue = number;

export type ColorShades = {
  [key: number]: HEXColor;
};

export type ShadeConfig = {
  steps: number;
};

export type ColorPaletteElement = {
  color: HEXColor;
  isComplex?: boolean;
  shades?: Record<number, HEXColor>;
  shadeConfig?: ShadeConfig;
};

export interface ColorPalette {
  [key: string]: ColorPaletteElement;
}
