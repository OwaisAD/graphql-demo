import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from "../utils/config";
import { infoLog, errorLog } from "../utils/logger";
import Person from "../models/person";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Person {
    id: ID!,
    name: String,
    age: Int,
    email: String,
    address: String,
    phone: String,
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    hello: String,
    books: [Book],
    users: [User],
    user(id: ID!): User,
    people: [Person],
    person(id: ID!): Person,
  }

  type Mutation {
    createPerson(person: PersonInput): Person,
    updatePerson(id: ID!, name: String!, age: Int!, email: String!, address: String!, phone: String!): Person,
    deletePerson(id: ID!): Person,
  }

  input PersonInput {
      name: String!
      age: Int!
      email: String!
      address: String!
      phone: String!
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@doe.dk",
    age: 25,
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@doe.dk",
    age: 30,
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@smith.dk",
    age: 35,
  },
];

const people = [
  {
    id: 1,
    name: "Alice Smith",
    age: 28,
    email: "alice.smith@example.com",
    address: "123 Main St, Anytown, USA",
    phone: "555-1234",
  },
  {
    id: 2,
    name: "Bob Johnson",
    age: 35,
    email: "bob.johnson@example.com",
    address: "456 Maple Ave, Anycity, USA",
    phone: "555-5678",
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 42,
    email: "charlie.brown@example.com",
    address: "789 Oak St, Anyvillage, USA",
    phone: "555-9012",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    books: () => books,
    users: () => users,
    user: (parent, args, context, info) => {
      const userId = args.id;
      return users.find((user) => user.id === userId);
    },
    people: () => people,
    person: (parent, args, context, info) => {
      const personId = args.id;
      return people.find((person) => person.id === personId);
    },
  },
  Mutation: {
    createPerson: (parent, args, context, info) => {
      const { name, age, email, address, phone } = args.person;
      console.log("Trying to create person");
      console.log("Created");
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.set("strictQuery", false);

console.log("connecting to ", PORT);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    infoLog("connected to MongoDB");
  })
  .catch((err: Error) => {
    errorLog("error connecting to MongoDB: ", err.message);
  });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
