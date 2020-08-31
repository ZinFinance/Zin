import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard";
import Profile from "../components/profile";
import Transactions from "../components/transactions";
import KYCApplication from "../components/kycApplication";
import KYCForm from "../components/kycForm";
import Referral from "../components/referral";
import EmailSuccessAuth from "../components/emailSuccessAuth";
import EmailFailAuth from "../components/emailFailAuth";

function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/tokensale" component={Dashboard} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/transactions" component={Transactions} />
      <Route exact path="/kyc-application" component={KYCApplication} />
      <Route exact path="/kyc-form" component={KYCForm} />
      <Route exact path="/referral" component={Referral} />
      <Route exact path="/emailsuccess" component={EmailSuccessAuth} />
      <Route exact path="/emailfail" component={EmailFailAuth} />
      <Redirect path="*" to="/tokensale" />
    </Switch>
  );
}

export default AuthRoutes;
