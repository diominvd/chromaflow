import React, { createContext, useContext, useState, useEffect } from 'react';

import { Palette } from '@/classes';
import { ColorPalette } from '@/types/types';

interface PaletteProviderProps {
  colors: ColorPalette;
  children: React.ReactNode;
}

interface PaletteContextProps {
  palette: Palette;
}

const PaletteContext = createContext<PaletteContextProps | null>(null);

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
