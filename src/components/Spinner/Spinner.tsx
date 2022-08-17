import { ReactNode } from 'react';
import classes from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'auto';
  loading?: boolean;
  children?: ReactNode;
}

export default function Spinner(props: SpinnerProps) {
  const { loading = true, size = 'sm', children } = props;

  return (
    <div className={`${classes.root} ${classes[size]}`}>
      {loading && (
        <span
          className={`${classes.spinner} border-color-accents-purple-black dark:border-color-shade-dark-4-day`}
        ></span>
      )}
      {children}
    </div>
  );
}
