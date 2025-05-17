import { useState } from 'react';

import { Palette } from '@/classes';
import { PaletteSection } from '@/frameworks/react/components/PaletteSection/PaletteSection.tsx';
import { PaletteElement } from '@/frameworks/react/components/PaletteElement/PaletteElement.tsx';
import './PaletteTools.scss';

interface PaletteToolsProps {
  palette: Palette;
}

export const PaletteTools = ({ palette }: PaletteToolsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div className='palette-tools'>
      <div className='palette-tools__float'>
        <button
          id='HldUn2rY1'
          data-open={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close palette' : 'Open palette'}
        </button>
      </div>
      <div
        className='palette-tools__content'
        data-open={isOpen}
      >
        <PaletteSection title='Simple colors'>
          {
            Object.entries(palette.getAllElements())
              .filter(([_, data]) => !data.shades)
              .map(([name, data]) => (
                <PaletteElement 
                  key={name}
                  name={name} 
                  color={data.color} 
                />
              ))
          }
        </PaletteSection>
        <PaletteSection title='Complex colors'>
          {
            Object.entries(palette.getAllElements())
              .filter(([_, data]) => data.shades)
              .map(([name, data]) => (
                <PaletteSection title={`[C] ${name}`}>
                  {
                    Object.entries(data.shades || {}).map(([shade, color]) => (
                      <PaletteElement 
                        key={`${name}-${shade}`}
                        name={`${name}-${shade}`}
                        color={color}
                      />
                    ))
                  }
                </PaletteSection>
              ))
          }
        </PaletteSection>
      </div>
    </div>
  )
}