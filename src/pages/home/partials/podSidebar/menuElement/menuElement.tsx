import React from 'react';
import { PodChevron } from 'src/components/icons/icons';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './menuElementStyles';

export interface Props {
  isActive?: boolean;
  label: string;
  isDisabled?: boolean;
  onClickCallback: () => void;
}

function MenuElement(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  return (
    <div
      className={`${classes.menuElement} ${
        props.isActive ? classes.menuElementActive : ''
      } 
      ${props.isDisabled ? classes.menuElementDisabled : ''}
      `}
      onClick={() => props.onClickCallback()}
    >
      <label>{props.label}</label>
      <PodChevron className={classes.podChevron} />
    </div>
  );
}

export default React.memo(MenuElement);
