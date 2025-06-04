import styles from './Option.module.scss';

interface OptionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isOpened: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Option: React.FC<OptionProps> = ({
  id,
  label,
  icon,
  isOpened,
  onClick,
  children
}) => {
  return (
    <div
      className={styles.option}
      id={id}
    >
      <div
        className={styles['option__trigger']}
        onClick={onClick}
      >
        {icon}
        <span className={styles['option__label']}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
      </div>
      {isOpened && (
        <div
          className={'option__content'}
          id={id}
        >
          {children}
        </div>
      )}
    </div>
  );
};
