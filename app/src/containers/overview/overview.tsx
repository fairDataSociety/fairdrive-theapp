import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./overviewStyles";
import SetupCards from "../../components/setUpCards/setUpCards";
import { Redirect } from "react-router-dom";

export interface Props {}

function Overview(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.Home}>
      {!state.password && <Redirect to={"/"} />}

      <SetupCards></SetupCards>
    </div>
  );
}

export default React.memo(Overview);
