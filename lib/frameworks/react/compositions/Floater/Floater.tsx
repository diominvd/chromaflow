import { useState } from 'react';
import { Palette } from '@react/widgets';
import styles from './Floater.module.scss';

export const Floater: React.FC = () => {
  const [currentOption, setCurrentOption] = useState<string | null>(null);

  const handleOptionClick = (id: string) => {
    setCurrentOption(currentOption === id ? null : id);
  }
  
  return (
    <div className={styles.floater}>
      <Palette 
        isOpened={currentOption === 'palette'}
        onClick={() => handleOptionClick('palette')}
      />
    </div>
  );
};
