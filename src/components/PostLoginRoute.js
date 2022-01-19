import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthService from "../services/auth-services";
import AccessForbidden from "../errors/AccessForbidden";

function PostLoginRoute({ component: Component, ...restOfProps }) {
  const loginRole = AuthService.getUserRole();
  const RouteGateway = (props) => {
    if (Boolean(loginRole)) {
      if (loginRole === true) {
        return <Component {...props} />;
      } else {
        return <AccessForbidden />;
      }
    } else {
      return <Navigate to="/" />;
    }
  };

  return <Route {...restOfProps} render={(props) => RouteGateway(props)} />;
}

export default PostLoginRoute;
