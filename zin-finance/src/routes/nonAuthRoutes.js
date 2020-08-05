import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

function NonAuthRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Redirect path="*" to="/sign-in" />
    </Switch>
  );
}

export default NonAuthRoutes;
