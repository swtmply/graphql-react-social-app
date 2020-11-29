const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv/config");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({
  app,
  cors: { origin: "http://localhost:3000", credentials: true },
});

require("mongoose").connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    app.listen({ port: 4000 }, () =>
      console.log(
        `Server running at http://localhost:4000${server.graphqlPath}`
      )
    );
  }
);
