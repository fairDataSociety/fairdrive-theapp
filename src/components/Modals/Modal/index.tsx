import CloseLight from '@media/UI/close-light.svg';
import CloseDark from '@media/UI/close-light.svg';
import Overlay from '@components/Overlay';
import React, { useContext } from 'react';
import classes from './Modal.module.scss';
import ThemeContext from '@context/ThemeContext';

interface Props {
  closeModal?: () => void;
  label?: string;
  children?: React.ReactNode;
  title?: string;
  isCentered?: boolean;
  showOverlay?: boolean;
  // eslint-disable-next-line
  Icon?: any; // Not sure what this needs to be yet
}

function Modal({ children, closeModal, showOverlay }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {showOverlay && (
        <Overlay>
          <div
            className={`flex flex-col items-center justify-center dark:bg-color-shade-dark-3-night bg-color-shade-dark-4-day text-color-accents-purple-black dark:text-color-shade-white-night border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow ${classes.Modal}`}
          >
            {theme === 'light' ? (
              <CloseLight className={classes.closeIcon} onClick={closeModal} />
            ) : (
              <CloseDark className={classes.closeIcon} onClick={closeModal} />
            )}

            {children}
          </div>
        </Overlay>
      )}
    </>
  );
}

export default Modal;
