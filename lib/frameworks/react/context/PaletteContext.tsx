import React, { createContext, useContext, useState, useEffect } from 'react';

import { Palette } from '@/classes';
import { ColorPalette } from '@/types';

export interface PaletteProviderProps {
  colors: ColorPalette;
  children: React.ReactNode;
}

export interface PaletteContextProps {
  palette: Palette;
}

export const PaletteContext = createContext<PaletteContextProps | null>(null);

export const PaletteProvider = ({
  colors,
  children
}: PaletteProviderProps) => {
  const [palette, setPalette] = useState<Palette>(() => new Palette(colors));

  useEffect(() => {
    const newPalette = new Palette(colors);
    setPalette(newPalette);
  }, [colors]);

  return (
    <PaletteContext.Provider value={{ palette }}>
      {children}
    </PaletteContext.Provider>
  )
}

export const usePalette = () => {
  const context  = useContext(PaletteContext);

  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context.palette;
}
