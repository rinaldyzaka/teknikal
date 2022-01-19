import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthService from "../services/auth-services";
import AccessUnauthoirized from "../errors/AccessUnauthorized";

function PreLoginRoute({ component: Component, ...restOfProps }) {
  const role = AuthService.getUserRole();
  const RouteGateway = (props) => {
    if (Boolean(role)) {
      if (role === true) {
        return <Navigate to="/home" />;
      } else {
        return <AccessUnauthoirized />;
      }
    } else {
      return <Component {...props} />;
    }
  };

  return <Route {...restOfProps} render={(props) => RouteGateway(props)} />;
}

export default PreLoginRoute;