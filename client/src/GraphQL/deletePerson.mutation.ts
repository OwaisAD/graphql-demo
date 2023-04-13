import { gql } from "@apollo/client";

export const DELETE_PERSON = gql`
  mutation DeletePerson($deletePersonId: ID!) {
    deletePerson(id: $deletePersonId)
  }
`;
