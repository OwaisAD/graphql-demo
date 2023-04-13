import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ADDRESS } from "../GraphQL/createAddress.mutation";

type AddressInput = {
  address: string;
};

const CreateAddressForm = () => {
  const [address, setAddress] = useState<AddressInput>({
    address: "",
  });

  const [createAddress, { data, error }] = useMutation(CREATE_ADDRESS);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAddress({ variables: { address } });
    if (error) {
      console.log(error);
      return;
    }
    setAddress({
      address: "",
    });
  };

  return (
    <div>
      <h1>Create address</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={address.address}
            onChange={(e) => setAddress({ address: e.target.value })}
          />
        </label>

        <button type="submit">Create Address</button>
        {error && <p>An error occurred: {error.message}</p>}
        {data && <p>Address created with ID {data.createAddress.id}</p>}
      </form>{" "}
    </div>
  );
};

export default CreateAddressForm;
