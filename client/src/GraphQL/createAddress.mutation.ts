import { gql } from "@apollo/client";

type AddressInput = {
  address: string;
};

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($address: AddressInput) {
    createAddress(address: $address) {
      id
      address
      persons {
        name
      }
    }
  }
`;
