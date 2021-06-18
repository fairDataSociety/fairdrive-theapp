import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import useStyles from "./cardWrapperStyles";

type Sizes = "small" | "regular" | "big";

export interface Props {
  size?: Sizes;
  children: React.ReactNode;
  onFileClick: any;
}

function CardWrapper(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div onClick={props.onFileClick} className={classes.CardWrapper}>
      {props.children}
    </div>
  );
}

export default React.memo(CardWrapper);
