import React, { createContext, useReducer, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
      role
    }
  }
`;

export const UsersContext = createContext({
  users: [],
});

const usersReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export const UsersProvider = (props) => {
  const [state, dispatch] = useReducer(usersReducer, { users: [] });

  const { data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data !== undefined) {
      dispatch({
        type: "GET_USERS",
        payload: data.getUsers,
      });
    }
  }, [data]);

  return <UsersContext.Provider value={{ users: state.users }} {...props} />;
};
