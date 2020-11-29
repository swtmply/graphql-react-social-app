import React, { useState, useEffect, useContext } from "react";
import Tables from "../../components/dashboard/Tables";

import { AuthContext, UsersContext } from "../../contexts";
import "../../styles/dashboard.scss";

import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      role
      email
    }
  }
`;

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const { users } = useContext(UsersContext);

  const [component, setComponent] = useState("dashboard");

  useEffect(() => {
    console.log(users);
  }, [users]);

  const switchComponent = () => {
    switch (component) {
      case "dashboard":
        return <p>Dashboard</p>;
      case "tables":
        return <Tables data={users} />;
      case "calendar":
        return <p>Calendar</p>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard__container">
      <div className="dashboard__nav">
        <h2>Logo</h2>
        <ul>
          <li>
            <button onClick={() => setComponent("dashboard")}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => setComponent("tables")}>Tables</button>
          </li>
          <li>
            <button onClick={() => setComponent("calendar")}>Calendar</button>
          </li>
        </ul>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div className="dashboard__component">{switchComponent()}</div>
    </div>
  );
};

export default Dashboard;
