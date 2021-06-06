import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./sidebarLinkStyles";
import { Link } from "react-router-dom";

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
}

function SidebarLink(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const { Icon, title } = props;
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.SidebarLink}>
      <Icon className={classes.Icon} />
      <Link to={"/"}>{title}</Link>
    </div>
  );
}

export default React.memo(SidebarLink);
