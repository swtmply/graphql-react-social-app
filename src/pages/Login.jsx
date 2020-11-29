import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { AuthContext } from "../contexts";

import "../styles/login.scss";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
      role
    }
  }
`;

const Login = () => {
  const { login } = useContext(AuthContext);

  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  const [userLogin] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      login(userData);
      localStorage.setItem("token", userData.token);
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
    setError({
      username: "",
      password: "",
    });

    if (
      (userForm.username === "" && userForm.password === "") ||
      e.target.value === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Sign-in</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            userLogin({ variables: userForm });
          }}
        >
          <div className="field">
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          {error.username && <p style={{ color: "red" }}>{error.username}</p>}
          <div className="field">
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          <div className="field">
            <button disabled={disabled} type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="links">
          <Link to="/register">
            <button>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
