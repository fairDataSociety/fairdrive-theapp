import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./sidebarLinkStyles";
import { Link } from "react-router-dom";

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  path: string;
}

function SidebarLink(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const { Icon, title, path } = props;
  const classes = useStyles({ ...props, ...theme });

  return (
    <Link className={classes.SidebarLink} to={path}>
      <Icon className={classes.Icon} />
      {title}
    </Link>
  );
}

export default React.memo(SidebarLink);
