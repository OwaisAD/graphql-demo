import React, { useContext } from "react";
import CreateAddressForm from "../components/CreateAddressForm";
import AddressList from "../components/Addresslist";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

const Addresses = () => {
  const { isLight, light, dark } = useContext(ThemeContext);
  const theme = isLight ? light : dark;
  const { currentUser } = useContext(UserContext);
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
      {currentUser !== null && currentUser.role === "Admin" ? (
        <CreateAddressForm />
      ) : (
        <h3 style={{ fontStyle: "italic", color: "red" }}>
          Only admins can create and modify address ressources
        </h3>
      )}
      <AddressList />
    </div>
  );
};

export default Addresses;
