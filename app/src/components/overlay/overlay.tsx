import React, { useContext } from 'react';
import useStyles from './overlayStyles';
import { ThemeContext } from '../../store/themeContext/themeContext';

export interface Props {
  handleClickAway?: () => void;
  children: React.ReactNode | React.ReactNode;
}

function Overlay(props: Props): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <>
      <div className={classes.dialogCenter}>{props.children}</div>
      <div
        onClick={() => props.handleClickAway()}
        className={classes.Overlay}
      ></div>
    </>
  );
}

export default React.memo(Overlay);
