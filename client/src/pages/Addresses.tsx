import React, { useContext } from "react";
import CreateAddressForm from "../components/CreateAddressForm";
import AddressList from "../components/Addresslist";
import { ThemeContext } from "../contexts/ThemeContext";

const Addresses = () => {
  const { isLight, light, dark } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  return (
    <div
      style={{
        background: theme.ui,
        color: theme.text,
        padding: "20px",
        marginTop: "10px",
        borderRadius: "12px",
      }}
    >
      <h1>Addresses page</h1>
      <CreateAddressForm />
      <AddressList />
    </div>
  );
};

export default Addresses;
