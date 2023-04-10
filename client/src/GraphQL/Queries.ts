import { gql } from "@apollo/client";

export const LOAD_POSTS = gql`
  {
    getAllPosts {
      id
      title
      description
    }
  }
`;
