import { gql } from "@apollo/client";

export const ADD_PERSON_TO_ADDRESS = gql`
  mutation AddPersonToAddress($personId: ID!, $addressId: ID!) {
    addPersonToAddress(personId: $personId, addressId: $addressId) {
      id
      address
      persons {
        id
        name
      }
    }
  }
`;
