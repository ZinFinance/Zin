import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminUserList from "../components/adminUserList";
import AdminUserDetails from "../components/adminUserDetails";

function AdminRoutes() {
  return (
    <Switch>
      <Route exact path="/admin-dashboard" component={AdminUserList} />
      <Route exact path="/user-details" component={AdminUserDetails} />
      <Redirect path="*" to="/admin-dashboard" />
    </Switch>
  );
}

export default AdminRoutes;
