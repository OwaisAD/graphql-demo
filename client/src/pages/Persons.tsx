import React, { useContext } from "react";
import CreatePersonForm from "../components/CreatePersonForm";
import PersonList from "../components/Personlist";
import { ThemeContext } from "../contexts/ThemeContext";

const Persons = () => {
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
      <h1>Persons page</h1>
      <CreatePersonForm />
      <PersonList />
    </div>
  );
};

export default Persons;
