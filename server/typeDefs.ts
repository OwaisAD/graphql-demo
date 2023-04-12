import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    description: String
  }

  type Person {
    id: ID!
    name: String
    age: Int
    email: String
    address: String
    phone: String
  }

  type Query {
    hello: String
    getAllPosts: [Post]
    getPostById(id: ID): Post
    getPersonById(id: ID!): Person
    getAllPeople: [Person]
  }

  input PostInput {
    title: String
    description: String
  }

  input PersonInput {
    name: String!
    age: Int!
    email: String!
    address: String!
    phone: String!
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
    createPerson(person: PersonInput): Person
    updatePerson(id: ID, person: PersonInput): Person
    deletePerson(id: ID!): String
  }
`;

export default typeDefs;
