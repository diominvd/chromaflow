import { ColorPaletteElement, HEXColor } from '@/types/types';
import { getLuminance } from '@/utils';
import { copyToClipboard } from '@/utils';
import styles from './ColorSwatch.module.scss';

interface ColorShadeProps {
  hex: HEXColor;
  onCopy: (hex: HEXColor) => void;
}

interface ColorSwatchProps {
  name: string;
  colorData: ColorPaletteElement;
  isOpened: boolean;
  onClick: () => void;
}

const ColorShade: React.FC<ColorShadeProps> = ({ hex, onCopy }) => {
  const luminance = getLuminance(hex);
  const textColor = luminance > 0.5 ? '#000' : '#fff';

  return (
    <div
      className={styles['color-shade']}
      style={{
        backgroundColor: hex,
        color: textColor
      }}
      onClick={() => onCopy(hex)}
      title={hex}
    />
  );
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  colorData,
  isOpened,
  onClick
}) => {
  const handleColorClick = () => {
    if (colorData.isComplex) {
      onClick();
    } else {
      copyToClipboard(colorData.color);
    }
  };

  return (
    <div className={styles['color-swatch']}>
      <div
        className={styles['color-swatch__color']}
        onClick={handleColorClick}
        style={{
          outline: isOpened ? '1.2px solid #5e5e5e' : 'none',
          outlineOffset: isOpened ? '2px' : '0',
          backgroundColor: colorData.color
        }}
        title={name}
      />
      {colorData.isComplex && isOpened && (
        <div className={styles['color-swatch__shades']}>
          {Object.entries(colorData.shades || {}).map(([_, color]) => (
            <ColorShade 
              key={color} 
              hex={color} 
              onCopy={copyToClipboard}
            />
          ))}
        </div>
      )}
    </div>
  );
};
