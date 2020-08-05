import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard";
import Profile from "../components/profile";
import Transactions from "../components/transactions";
import KYCApplication from "../components/kycApplication";
import KYCForm from "../components/kycForm";
import BuyToken from "../components/buyToken";

function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/kyc-application" component={KYCApplication} />
      <Route path="/kyc-form" component={KYCForm} />
      <Route path="/buy-token" component={BuyToken} />
      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default AuthRoutes;
