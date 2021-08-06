import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import useStyles from './toggleStyles';

export interface Props {
  isLeft: boolean;
  show: boolean;
  setLeft: (isLeft: boolean) => void;
}

function Toggle(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.toggleContainer}>
      <label className={classes.switch}>
        <span className={classes.left} onClick={() => props.setLeft(true)}>
          Owned
        </span>
        <span className={classes.right} onClick={() => props.setLeft(false)}>
          Shared
        </span>
      </label>
    </div>
  );
}

export default React.memo(Toggle);
