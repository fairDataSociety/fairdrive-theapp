import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { Close, ModalFolder } from '../../icons/icons';
import useStyles from './modalStyles';
import Overlay from 'src/components/overlay/overlay';

export interface Props {
  children?: React.ReactNode;
  handleClick?: () => void;
  handleClose?: () => void;
  handleClickAway?: () => void;
  heading: string;
  button?: string;
  disabledButton?: string;
  icon?: boolean;
  confirmMessage?: string;
  notifyMessage?: string;
  errorMessage?: string;
}

function Modal(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <Overlay handleClickAway={props.handleClose}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          {props.icon && <ModalFolder className={classes.icon} />}
          {props.heading}
          <button onClick={props.handleClose}>
            <Close className={classes.closeIcon} />
          </button>
        </div>
        <div className={classes.flex}>
          <div className={classes.body}>
            <div>{props.children}</div>
            {props.confirmMessage && (
              <p className={classes.confirmMessage}>{props.confirmMessage}</p>
            )}
            {props.notifyMessage && (
              <p className={classes.notifyMessage}>{props.notifyMessage}</p>
            )}
            {props.errorMessage && (
              <p className={classes.errorMessage}>{props.errorMessage}</p>
            )}
          </div>
          <div className={classes.buttonContainer}>
            {props.button && (
              <button className={classes.button} onClick={props.handleClick}>
                {props.button}
              </button>
            )}
            {props.disabledButton && (
              <button className={classes.disabledButton}>
                {props.disabledButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

export default React.memo(Modal);
