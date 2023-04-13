import React from "react";
import CreateAddressForm from "../components/CreateAddressForm";
import AddressList from "../components/Addresslist";

const Addresses = () => {
  return (
    <div>
      <h1>Addresses page</h1>
      <CreateAddressForm />
      <AddressList />
    </div>
  );
};

export default Addresses;
