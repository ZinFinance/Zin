import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/dashboard";
import SignIn from "./components/signIn";
import Profile from "./components/profile";
import SignUp from "./components/signUp";
import Transactions from "./components/transactions";
import KYCApplication from "./components/kycApplication";
import KYCForm from "./components/kycForm";

function Routes() {
  const user = useSelector((state) => state.userReducer.user);
  if (user) {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/kyc-application" component={KYCApplication} />
        <Route path="/kyc-form" component={KYCForm} />
        <Redirect path="*" to="/" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Redirect path="*" to="/sign-in" />
      </Switch>
    );
  }
}

export default Routes;
