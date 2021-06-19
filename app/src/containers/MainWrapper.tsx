import React from "react";
import Navbar from "./navbar/navbar";
import Main from "./main/main";
import useStyles from "./MainWrapperStyles";
import { useTheme } from "../store/themeContext/themeContext";

export default function MainWrapper() {
  const { theme } = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.App}>
      <Navbar />
      <Main></Main>
      {/* <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/drive/:path" component={Home} />
          <Route exact path="/explore" />
          <Route exact path="/overview" component={Overview} />
        </Switch> */}
    </div>
  );
}
