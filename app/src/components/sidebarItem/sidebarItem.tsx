import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './sidebarItemStyles';

export interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  onClick: () => void;
  isDisabled: boolean;
  isActive: boolean;
}

function SidebarItem(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { Icon, title, isDisabled, isActive } = props;
  const classes = useStyles({ ...props, ...theme });

  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={isDisabled}
      className={`
      ${classes.SidebarItem} 
      ${isActive ? classes.active : ''}
      ${isDisabled ? classes.disabled : ''}
    `}
    >
      <Icon className={classes.Icon} />
      {title}
    </button>
  );
}

export default React.memo(SidebarItem);
