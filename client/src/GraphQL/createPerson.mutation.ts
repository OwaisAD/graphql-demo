import { gql } from "@apollo/client";

type PersonInput = {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  image: string;
};

export const CREATE_PERSON = gql`
  mutation CreatePerson($person: PersonInput) {
    createPerson(person: $person) {
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
