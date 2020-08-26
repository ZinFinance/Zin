import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ForgotPassword from "../components/forgotPassword";
import SignUpSuccess from "../components/signUpSuccess";
import EmailSuccess from "../components/emailSuccess";
import EmailFail from "../components/emailFail";
import ResetAccount from "../components/resetAccount";

function NonAuthRoutes() {
  return (
    <Switch>
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-in:pathParam?" component={SignIn} />
      <Route exact path="/sign-up-success" component={SignUpSuccess} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/emailsuccess" component={EmailSuccess} />
      <Route exact path="/emailfail" component={EmailFail} />
      <Route exact path="/resetaccount" component={ResetAccount} />
      <Redirect exact path="/tokensale" to="/sign-up" />
      <Redirect exact path="/" to="/sign-up" />
      <Redirect
        path="*"
        to={{
          pathname: `/sign-in`,
          search: `continue=${
            window.location.pathname === "/"
              ? "/tokensale"
              : window.location.pathname
          }`,
        }}
      />
    </Switch>
  );
}

export default NonAuthRoutes;
