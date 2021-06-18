import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./overviewStyles";
import SetupCards from "../setUpCards/setUpCards";
export interface Props {
  isPodBarOpen: boolean
}

function Overview(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.Home}>
      <SetupCards></SetupCards>
    </div>
  );
}

export default React.memo(Overview);
