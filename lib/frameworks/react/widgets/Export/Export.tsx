import { Download } from 'lucide-react';
import { usePalette } from '@react/context';
import { Option, Separator } from '@react/components';
import './Export.scss';

interface ExportProps {
  isOpened: boolean;
  onClick: () => void;
}

export const Export: React.FC<ExportProps> = ({
  isOpened,
  onClick
}) => {
  const palette = usePalette();
  
  const handleExport = (id: string) => {
    const colors = palette.getAllElements();
    
    const exportFormats = {
      css: () => {
        return Object.entries(colors).reduce((acc, [name, data]) => {
          if (data.shades) {
            Object.entries(data.shades).forEach(([shade, color]) => {
              acc += `--${name}-${shade}: ${color};\n`;
            });
          } else {
            acc += `--${name}: ${data.color};\n`;
          }
          return acc;
        }, '');
      },
      json: () => {
        return Object.entries(colors).reduce((acc, [name, data]) => {
          acc[name] = data.shades || data.color;
          return acc;
        }, {} as Record<string, string | Record<string, string>>);
      }
    };

    const result = exportFormats[id as keyof typeof exportFormats]?.();
    navigator.clipboard.writeText(
      typeof result === 'string' ? result : JSON.stringify(result, null, 2)
    );
  };

  return (
    <Option
      id='export'
      label='Export'
      icon={<Download />}
      isOpened={isOpened}
      onClick={onClick}
    >
      <button
        className='export-button'
        id='css'
        onClick={() => handleExport('css')}
      >
        CSS
      </button>
      <Separator height={20} />
      <button
        className='export-button'
        id='json'
        onClick={() => handleExport('json')}
      >
        JSON
      </button>
    </Option>
  );
};
