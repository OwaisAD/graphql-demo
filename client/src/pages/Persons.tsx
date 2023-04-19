import React, { useContext } from "react";
import CreatePersonForm from "../components/CreatePersonForm";
import PersonList from "../components/Personlist";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

const Persons = () => {
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
      <h1>Persons page</h1>
      {currentUser !== null && currentUser.role === "Admin" ? (
        <CreatePersonForm />
      ) : (
        <h3 style={{ fontStyle: "italic", color: "red" }}>
          Only admins can create and modify person ressources.
        </h3>
      )}

      <PersonList />
    </div>
  );
};

export default Persons;
