import { useState } from 'react';

import { ChevronRight } from 'lucide-react';
import './PaletteSection.scss';

interface PaletteSectionProps {
  title: string;
  children: React.ReactNode;
}

export const PaletteSection = ({ title, children }: PaletteSectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className='palette-section'>
      <div
        className='palette-section__head'
        data-open={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className='palette-section__title'>{title}</p>
        <ChevronRight />
      </div>
      {isOpen && (
        <div className='palette-section__content'>
          {children}
        </div>
      )}
    </div>
  )
}