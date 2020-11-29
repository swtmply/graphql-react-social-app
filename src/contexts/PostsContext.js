import React, { createContext, useReducer, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      body
      likes
      user {
        username
      }
    }
  }
`;

export const PostsContext = createContext({
  posts: [],
});

const postsReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export const PostsProvider = (props) => {
  const [state, dispatch] = useReducer(postsReducer, { posts: [] });

  const { data } = useQuery(GET_POSTS);

  useEffect(() => {
    if (data !== undefined) {
      dispatch({
        type: "GET_POSTS",
        payload: data.getPosts,
      });
    }
  }, [data]);

  return <PostsContext.Provider value={{ posts: state.posts }} {...props} />;
};
