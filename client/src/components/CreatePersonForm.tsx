import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON } from "../GraphQL/createPerson.mutation";

type PersonInput = {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  image: string;
};

const CreatePersonForm = () => {
  const [person, setPerson] = useState<PersonInput>({
    name: "",
    age: 13,
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const [createPerson, { data, error }] = useMutation(CREATE_PERSON);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPerson({ variables: { person } });
    if (error) {
      console.log(error);
      return;
    }
    setPerson({
      name: "",
      age: 13,
      email: "",
      phone: "",
      address: "",
      image: "",
    });
  };

  return (
    <div>
      <h1>Create person</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={person.name}
            onChange={(e) => setPerson({ ...person, name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={person.age}
            onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value) })}
            min="13"
            max="100"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={person.email}
            onChange={(e) => setPerson({ ...person, email: e.target.value })}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={person.phone}
            onChange={(e) => setPerson({ ...person, phone: e.target.value })}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={person.address}
            onChange={(e) => setPerson({ ...person, address: e.target.value })}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={person.image}
            onChange={(e) => setPerson({ ...person, image: e.target.value })}
          />
        </label>

        <button type="submit">Create Person</button>
        {error && <p>An error occurred: {error.message}</p>}
        {data && <p>Person created with ID {data.createPerson.id}</p>}
      </form>{" "}
    </div>
  );
};

export default CreatePersonForm;
