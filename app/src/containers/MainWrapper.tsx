import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import Login from "./../components/login/login";

export default function MainWrapper() {
  return (
    <Router>
      <div className="Main">
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" />
        </Switch>
      </div>
    </Router>
  );
}
