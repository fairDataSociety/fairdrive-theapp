import React, { useContext } from "react";
import useStyles from "./mainStyles";
import Navbar from "../navbar/navbar";
import Login from "../../components/login/login";
import ButtonLink from "../../components/buttonLink/buttonLink";
import { StoreContext } from "../../store/store";
import { ThemeContext } from "../../store/themeContext/themeContext";
export interface Props {}

function Main(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const test = () => {};
  return (
    <div className={classes.Main}>
      {/* <Login></Login> */}
      <ButtonLink label="Login" color="grey" path="/login"></ButtonLink>
    </div>
  );
}
export default React.memo(Main);
