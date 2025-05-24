import './ColorGraduation.scss';

interface ColorGraduationProps {
  shades: { [key: number | string]: string };
  isSelected: boolean;
}

export const ColorGraduation = ({
  shades,
  isSelected
}: ColorGraduationProps) => {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div
      className='color-graduation__wrapper'
      data-opened={isSelected}
    >
      {
        Object.entries(shades).map(([shade, color]) => (
          <div
            key={`${color}-${shade}`}
            className='color-graduation__section'
            onClick={() => copyToClipboard(color)}
          >
            <div
              className='color-graduation__color'
              style={{
                backgroundColor: color
              }}
            >
            </div>
            <span className='color-graduation__shade'>{shade}</span>
          </div>
        ))
      }
    </div>
  )
}
