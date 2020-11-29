const UsersResolver = require("./Users");
const PostsResolver = require("./Posts");

module.exports = {
  Query: {
    ...UsersResolver.Query,
    ...PostsResolver.Query,
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...PostsResolver.Mutation,
  },
};
