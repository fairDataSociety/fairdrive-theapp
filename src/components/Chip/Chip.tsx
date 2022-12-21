import { ReactNode } from 'react';
import classes from './Chip.module.scss';

interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export default function Chip(props: ChipProps) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { children, selected = false, onClick = () => {} } = props;

  const getChipClass = () => {
    const chipClass = [classes.chip];
    if (!selected) {
      chipClass.push(
        'dark:border-color-accents-grey-pastel dark:text-color-accents-grey-pastel'
      );
    } else {
      chipClass.push('dark:bg-color-accents-grey-pastel bg-grey');
    }
    return chipClass.join(' ');
  };

  return (
    <button onClick={onClick} className={`${classes.chip} ${getChipClass()}`}>
      {children}
    </button>
  );
}
