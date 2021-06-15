import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import Home from "./home/home";
import Overview from "./overview/overview";
import useStyles from "./MainWrapperStyles";
import { useTheme } from "../store/themeContext/themeContext";

export default function MainWrapper() {
  const { theme } = useTheme();
  const classes = useStyles(theme);

  return (
    <Router>
      <div className={classes.App}>
        <Navbar />
        <Sidebar />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/drive/:path" component={Home} />
          <Route exact path="/explore" />
          <Route exact path="/overview" component={Overview} />
        </Switch>
      </div>
    </Router>
  );
}
