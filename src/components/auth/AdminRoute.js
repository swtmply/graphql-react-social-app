import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user.role === "admin") {
          return <Component {...props} />;
        } else if (user && user.role === "user") {
          return <Redirect to="/home" />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default AdminRoute;
