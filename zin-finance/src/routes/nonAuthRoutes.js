import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ForgotPassword from "../components/forgotPassword";
import SignUpSuccess from "../components/signUpSuccess";

function NonAuthRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-up-success" component={SignUpSuccess} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Redirect path="*" to="/sign-in" />
    </Switch>
  );
}

export default NonAuthRoutes;
