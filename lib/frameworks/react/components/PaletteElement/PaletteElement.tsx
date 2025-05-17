import { HEXColor } from '@/types';
import { getLuminance } from '@/utils';
import './PaletteElement.scss';

interface PaletteElementProps {
  name: string;
  color: HEXColor;
}

export const PaletteElement = ({ name, color }: PaletteElementProps) => {
  const luminance: number = getLuminance(color);
  const textColor: HEXColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  return (
    <div 
      className='palette-element' 
      onClick={() => copyToClipboard(color)}
      style={{ 
        backgroundColor: color 
      }}>
      <span
        className='palette-element__name' 
        style={{ 
          color: textColor
        }}
      >
        {name}
      </span>
      <span
        className='palette-element__color'
        style={{
          color: textColor
        }}
      >
        {color}
      </span>
    </div>
  )
}