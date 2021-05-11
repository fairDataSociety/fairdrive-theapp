import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import Home from "./home/home";
import AuthRoute from "./authRoute/authRoute";
import Login from "./../components/login/login";
import Register from "./../components/register/register";
import SeedPhraseGen from "./../components/seedPhraseGen/seedPhraseGen";
import SeedPhraseConfirm from "./../components/seedPhraseConfirm/seedPhraseConfirm";
export default function MainWrapper() {
  return (
    <Router>
      <div className="Main">
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Switch>
          <Route exact path="/create" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/generate-seed" component={SeedPhraseGen} />
          <Route exact path="/confirm-seed" component={SeedPhraseConfirm} />
          <Route exact path="/" component={Main} />
          <Route exact path="/drive/:pod" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
