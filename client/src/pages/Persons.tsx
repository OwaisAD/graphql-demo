import React from "react";
import CreatePersonForm from "../components/CreatePersonForm";
import PersonList from "../components/Personlist";

const Persons = () => {
  return (
    <div>
      <h1>Persons page</h1>
      <CreatePersonForm />
      <PersonList />
    </div>
  );
};

export default Persons;
