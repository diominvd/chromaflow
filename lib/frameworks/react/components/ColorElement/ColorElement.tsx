import { ColorPaletteElement } from '@/types';
import { ColorGraduation } from '../ColorGraduation/ColorGraduation.tsx';
import './ColorElement.scss';

interface ColorElementProps {
  name: string;
  data: ColorPaletteElement;
  isSelected: boolean;
  onSelect: () => void;
}

export const ColorElement = ({ 
  name, 
  data,
  isSelected,
  onSelect,
}: ColorElementProps) => {
  return (
    <div className='color-element__wrapper'>
      <div 
        className='color-element'
        data-clicked={isSelected}
        onClick={onSelect}
        style={{
          color: data.color,
          backgroundColor: data.color,
          
        }}
      >
      </div>
      <span
        className='color-element__name'
        data-opened={isSelected}
      >
        {name}
      </span>
      <ColorGraduation shades={ data.shades || { [name]: data.color }} isSelected={isSelected} />
    </div>
  )
}
