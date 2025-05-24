import { useState } from 'react';

import { ColorPalette } from '@/types';
import { ColorElement } from '../../components/ColorElement/ColorElement.tsx';
import './Floater.scss';

interface FloaterProps {
  palette: ColorPalette;
}

export const Floater = ({ palette }: FloaterProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(prev => prev === colorName ? null : colorName);
  };

  return (
    <div className='floater'>
      <div className='floater__section' id='simple'>
        {
          Object.entries(palette)
            .filter(([_, data]) => !data.shades)
            .map(([name, data]) => (
              <ColorElement
                key={name}
                name={name}
                data={data}
                isSelected={selectedColor === name}
                onSelect={() => handleColorSelect(name)}
              />
            ))
        }
      </div>
      <div className='floater__separator'></div>
      <div className='floater__section' id='complex'>
        {
            Object.entries(palette)
              .filter(([_, data]) => data.shades)
              .map(([name, data]) => (
                <ColorElement
                  key={name}
                  name={name}
                  data={data}
                  isSelected={selectedColor === name}
                  onSelect={() => handleColorSelect(name)}
                />
              ))
          }
      </div>
    </div>
  );
};