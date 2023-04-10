import { gql } from "@apollo/client";

type PostInput = {
  title: string;
  description: string;
};

export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput) {
    createPost(post: $post) {
      description
      id
      title
    }
  }
`;
