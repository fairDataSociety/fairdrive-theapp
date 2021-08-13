import React, { useContext } from 'react';
import useStyles from './overlayStyles';
import ClickAwayListener from 'react-click-away-listener';
import { ThemeContext } from '../../store/themeContext/themeContext';

export interface Props {
  handleClickAway?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

function Overlay(props: Props): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <>
      <div className={classes.Overlay} />
      <div className={classes.children}>{props.children}</div>
    </>
  );
}

export default React.memo(Overlay);
