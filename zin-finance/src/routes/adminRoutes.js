import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminUserList from "../components/adminUserList";
import AdminUserTransactions from "../components/adminUserTransactions";
import AdminUserBonusTransactions from "../components/adminUserBonusTransactions";
import AdminDashboard from "../components/adminDashboard";
import Profile from "../components/profile";

function AdminRoutes() {
  return (
    <Switch>
      <Route exact path="/admin-dashboard" component={AdminDashboard} />
      <Route exact path="/user-list/" component={AdminUserList} />
      <Route
        exact
        path="/user-transactions/:email?"
        component={AdminUserTransactions}
      />
      <Route
        exact
        path="/user-bonus-transactions/:email?"
        component={AdminUserBonusTransactions}
      />

      <Route exact path="/profile" component={Profile} />
      <Redirect path="*" to="/admin-dashboard" />
    </Switch>
  );
}

export default AdminRoutes;
