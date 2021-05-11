import React, { useContext } from "react";
import useStyles from "./mainStyles";
import ButtonLink from "../../components/buttonLink/buttonLink";
import { StoreContext } from "../../store/store";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { Redirect } from "react-router-dom";

export interface Props {}

function Main(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  return (
    <div className={classes.Main}>
      {/* <Login></Login> */}
      {state.password && <Redirect to={"/drive/root"} />}

      <ButtonLink label="Login" color="grey" path="/login"></ButtonLink>
      <ButtonLink label="Register" color="grey" path="/register"></ButtonLink>
    </div>
  );
}
export default React.memo(Main);
