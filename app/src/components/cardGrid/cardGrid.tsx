import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./cardGridStyles";

export interface Props {
  children: React.ReactNode;
}

function CardGrid(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.CardGrid}>
      <div className={classes.grid}>{props.children}</div>
    </div>
  );
}

export default React.memo(CardGrid);
