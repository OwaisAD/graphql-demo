import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
const typeDefs = gql `
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => {
            return "Hello World!";
        },
    },
};
const startServer = async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start(); // recommended to use .start() before listening to port with express
    apolloServer.applyMiddleware({ app });
    app.use((req, res) => {
        res.send("Hello from express apollo server");
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
};
startServer();
