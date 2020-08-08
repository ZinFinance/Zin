import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ForgotPassword from "../components/forgotPassword";

function NonAuthRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Redirect path="*" to="/sign-in" />
    </Switch>
  );
}

export default NonAuthRoutes;
