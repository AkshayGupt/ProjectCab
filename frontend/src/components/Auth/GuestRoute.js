import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./helper";

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default GuestRoute;
