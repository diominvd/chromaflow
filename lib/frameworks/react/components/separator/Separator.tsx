interface SeparatorProps {
  height?: number;
}

export const Separator: React.FC<SeparatorProps> = ({
  height
}) => {
  return (
    <div
      className='separator'
      style={{
        width: '1px',
        height: height ? `${height}px` : 'auto',
        backgroundColor: '#2c2c2c'
      }}
    />
  );
};
