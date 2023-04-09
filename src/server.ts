import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "../typeDefs";
import resolvers from "../resolvers";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start(); // recommended to use .start() before listening to port with express
  apolloServer.applyMiddleware({ app, path: "/graphql_sbx" });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  const url: string = process.env.MONGO_DB || "";

  // connect to mongodb
  console.log("Connecting to mongoose");
  await mongoose.connect(url);
  console.log("Mongoose connected");

  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
};

startServer();
