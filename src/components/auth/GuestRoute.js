import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts";

const GuestRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user === null) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/dashboard" />;
        }
      }}
    />
  );
};

export default GuestRoute;
