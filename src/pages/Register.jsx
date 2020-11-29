import React, { useState, useContext, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

import { AuthContext, UsersContext } from "../contexts";
import { Link } from "react-router-dom";

const REGISTER = gql`
  mutation Register(
    $username: String!
    $password: String!
    $password1: String!
    $email: String!
  ) {
    register(
      input: {
        username: $username
        password: $password
        password1: $password1
        email: $email
      }
    ) {
      username
      token
      role
    }
  }
`;

const Register = () => {
  const { login } = useContext(AuthContext);
  const { users } = useContext(UsersContext);

  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    setCurrentUsers(users);
  }, [users]);

  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    password1: "",
  });

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [userRegister] = useMutation(REGISTER, {
    update(_, { data: { register: userData } }) {
      login(userData);
      localStorage.setItem("token", userData.token);
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
    setError({
      email: "",
      username: "",
      password: "",
    });

    if (e.target.name === "username") {
      currentUsers.map((user) => {
        if (user.username === e.target.value) {
          setError({
            ...error,
            username: "Username is already taken",
          });
        }
      });
    }

    if (e.target.name === "email") {
      const regex = /.+\@.+\..+/;

      const test = regex.test(e.target.value);
      if (!test) {
        setError({
          ...error,
          email: "Invalid Email",
        });
      }

      currentUsers.map((user) => {
        if (user.email === e.target.value) {
          setError({
            ...error,
            email: "Email is already taken",
          });
        }
      });
    }

    if (e.target.name === "password") {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const test = regex.test(e.target.value);
      if (!test) {
        setError({
          ...error,
          password:
            "Password must have at least 8 characters with one letter and number",
        });
      }
    }

    if (e.target.name === "password1") {
      if (e.target.value !== registerForm.password) {
        setError({
          ...registerForm,
          password: "Passwords do not match",
        });
      }
    }
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userRegister({ variables: registerForm });
        }}
      >
        <div className="field">
          <label>Email</label>
          <input type="text" onChange={handleChange} name="email" />
        </div>
        {error.email && <pre>{error.email}</pre>}
        <div className="field">
          <label>Username</label>
          <input type="text" onChange={handleChange} name="username" />
        </div>
        {error.username && <pre>{error.username}</pre>}
        <div className="field">
          <label>Password</label>
          <input type="password" onChange={handleChange} name="password" />
        </div>
        {error.password && <pre>{error.password}</pre>}
        <div className="field">
          <label>Confirm Password</label>
          <input type="password" onChange={handleChange} name="password1" />
        </div>
        <div className="field">
          <input type="submit" value="Register" />
        </div>
        <div className="links">
          <Link to="/">
            <h4>Sign-in</h4>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
