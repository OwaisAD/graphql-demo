import { gql } from "@apollo/client";

export const LOAD_ADDRESSES = gql`
  {
    getAllAddresses {
      id
      address
      persons {
        id
        name
        age
        email
      }
    }
  }
`;
