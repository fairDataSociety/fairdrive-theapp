import { FC, useEffect, useRef } from 'react';
import classes from './Toast.module.scss';

export interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, open, onClose }: ToastProps) => {
  const timeoutHadle = useRef<ReturnType<typeof setTimeout>>();

  const closeTimeout = () => {
    if (timeoutHadle.current) {
      clearTimeout(timeoutHadle.current);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    closeTimeout();

    timeoutHadle.current = setTimeout(onClose, 3000);

    return closeTimeout;
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={`text-color-accents-purple-black dark:text-color-shade-light-1-night bg-color-shade-dark-2-day dark:bg-color-shade-dark-1-night  ${
        classes.toast
      } ${open ? classes.show : ''}`}
    >
      {message}
    </div>
  );
};

export default Toast;
