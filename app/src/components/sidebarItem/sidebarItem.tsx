import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './sidebarItemStyles';

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  onClick: () => void;
}

function SidebarItem(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { Icon, title } = props;
  const classes = useStyles({ ...props, ...theme });

  return (
    <div onClick={props.onClick} className={classes.SidebarItem}>
      <Icon className={classes.Icon} />
      {title}
    </div>
  );
}

export default React.memo(SidebarItem);
