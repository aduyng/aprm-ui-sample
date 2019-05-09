import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInPage from "../../pages/SignInPage/SignInPage";
import IndexPage from "../../pages/IndexPage/IndexPage";
import RolesPage from "../../pages/RolesPage/RolesPage";
import RolePage from "../../pages/RolePage/RolePage";

export default () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/sign-in" exact component={SignInPage} />
      <Route path="/roles" exact component={RolesPage} />
      <Route path="/roles/add" exact component={RolePage} />
      <Route path="/roles/view" component={RolePage} />
    </Router>
  );
};
