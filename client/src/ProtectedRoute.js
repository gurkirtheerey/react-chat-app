import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import RootState from "./app/store";

const ProtectedRoute = ({ component: Component, user = false, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
