const { gql } = require("apollo-server-express");

module.exports = gql`
  # User
  type User {
    id: ID!
    username: String!
    password: String
    email: String!
    role: String
    token: String
    posts: [Post]
  }
  input RegisterInput {
    username: String!
    password: String!
    password1: String!
    email: String!
    role: String
  }
  input EditUserInput {
    id: ID!
    username: String
    password: String
    newPassword: String
    email: String
    role: String
  }

  # Post
  type Comment {
    body: String
    likes: Int
  }
  type Post {
    id: ID!
    body: String!
    likes: Int
    commentsCount: Int
    comments: [Comment]
    user: User!
  }

  # QUERY
  type Query {
    getUsers: [User]
    getPosts: [Post]
  }
  # MUTATION
  type Mutation {
    # User CRUD
    updateUser(input: EditUserInput): User!
    deleteUser(id: String!): User!
    # User Register/Login
    register(input: RegisterInput): User!
    login(username: String!, password: String!): User!
    verify(token: String!): Boolean!

    # TODO: Post CRUD
    createPost(userId: String!, body: String!): Post!
  }
`;
