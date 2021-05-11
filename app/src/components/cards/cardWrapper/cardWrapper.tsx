import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import useStyles from "./cardWrapperStyles";

type Sizes = "small" | "smallest" | "regular";

export interface Props {
  size?: Sizes;
  children: React.ReactNode;
}

function CardWrapper(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return <div className={classes.CardWrapper}>{props.children}</div>;
}

export default React.memo(CardWrapper);
