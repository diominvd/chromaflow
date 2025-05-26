import { useState, useEffect, useMemo } from 'react';
import { SwatchBook } from 'lucide-react';
import { ColorPaletteElement } from '@/types/types';
import { usePalette } from '@react/context';
import { Option, Separator } from '@react/components';
import { ColorSwatch } from '@react/components';
import './Palette.scss';

interface PaletteProps {
  isOpened: boolean;
  onClick: () => void;
}

type ColorElements = [string, ColorPaletteElement][];

export const Palette: React.FC<PaletteProps> = ({
  isOpened,
  onClick,
}) => {
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const palette = usePalette();

  const colorElements = useMemo(() => 
    Object.entries(palette.getAllElements()),
    [palette]
  );

  const simpleColors = useMemo(() => 
    colorElements.filter(([_, data]) => !data.shades),
    [colorElements]
  );

  const complexColors = useMemo(() => 
    colorElements.filter(([_, data]) => data.shades),
    [colorElements]
  );

  const handleColorClick = (colorName: string) => {
    setCurrentColor(prev => prev === colorName ? null : colorName);
  };

  useEffect(() => {
    if (!isOpened) {
      setCurrentColor(null);
    }
  }, [isOpened]);

  const renderColorSwatches = (colors: ColorElements) => (
    <div className='colors'>
      {colors.map(([name, data]) => (
        <ColorSwatch
          key={name}
          name={name}
          colorData={data}
          isOpened={currentColor === name}
          onClick={() => handleColorClick(name)}
        />
      ))}
    </div>
  );

  return (
    <Option
      id='palette'
      label='Palette'
      icon={<SwatchBook />}
      isOpened={isOpened}
      onClick={onClick}
    >
      {renderColorSwatches(simpleColors)}
      <Separator height={20} />
      {renderColorSwatches(complexColors)}
    </Option>
  );
};
