import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";

import { AuthProvider, PostsProvider, UsersProvider } from "./contexts";
import UserRoute from "./components/auth/UserRoute";
import GuestRoute from "./components/auth/GuestRoute";
import AdminRoute from "./components/auth/AdminRoute";
import Nav from "./components/layout/Nav";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UsersProvider>
        <PostsProvider>
          <AuthProvider>
            <Router>
              <Nav />
              <Switch>
                <GuestRoute exact path="/" component={Login} />
                <GuestRoute exact path="/register" component={Register} />
                <UserRoute exact path="/home" component={Home} />
                <AdminRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </Router>
          </AuthProvider>
        </PostsProvider>
      </UsersProvider>
    </ApolloProvider>
  );
}

export default App;
