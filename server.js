require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./src/schema");
const graphQlResolver = require("./src/resolvers");
const mongoose = require("mongoose");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
  })
);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ja1lrfi.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, options)
  .then(() => app.listen(4000, console.log("Server is listening on 4000")))
  .catch((error) => {
    throw error;
  });
