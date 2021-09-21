import React, { useContext } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './sidebarItemStyles';
import { ArrowRight } from 'src/components/icons/icons';
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
      <div className={classes.arrow}>
        <ArrowRight className={classes.arrowIcon} />
      </div>
    </button>
  );
}

export default React.memo(SidebarItem);
