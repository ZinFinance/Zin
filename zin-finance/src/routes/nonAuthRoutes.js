import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ForgotPassword from "../components/forgotPassword";
import SignUpSuccess from "../components/signUpSuccess";

function NonAuthRoutes() {
  return (
    <Switch>
      <Route exact path="/sign-in:pathParam?" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-up-success" component={SignUpSuccess} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Redirect
        path="*"
        to={{
          pathname: `/sign-in`,
          search: `continue=${window.location.pathname}`,
        }}
      />
    </Switch>
  );
}

export default NonAuthRoutes;
