import { gql } from "@apollo/client";

export const LOAD_PEOPLE = gql`
  {
    getAllPeople {
      id
      age
      email
      image
      name
      phone
      address
      addresses {
        id
        address
      }
    }
  }
`;
