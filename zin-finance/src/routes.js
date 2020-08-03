import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Dashboard from "./components/dashboard";
import SignIn from "./components/signIn";
import Profile from "./components/profile";
import SignUp from "./components/signUp";
import Transactions from "./components/transactions";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/profile" component={Profile} />
    <Route path="/transactions" component={Transactions} />
    <Redirect path="*" to="/" />
  </Switch>
);

export default Routes;
