import { gql } from "@apollo/client";

export const LOAD_PEOPLE = gql`
  {
    getAllPeople {
      id
      name
      age
      email
      address
      phone
      image
    }
  }
`;
