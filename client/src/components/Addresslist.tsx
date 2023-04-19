import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_ADDRESSES } from "../GraphQL/loadAddresses.query";
import { UserContext } from "../contexts/UserContext";

type AddressType = {
  id: string;
  address: string;
  persons?: [
    {
      id?: string;
      name?: string;
      age?: number;
      email?: string;
    }
  ];
};

const AddressList = () => {
  const { loading, error, data } = useQuery(LOAD_ADDRESSES);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (data) {
      setAddresses(data.getAllAddresses);
    }
  }, [data]);

  console.log(addresses);

  if (loading) return <p>loading...</p>;

  if (error) return <p>Error occured...</p>;

  return (
    <div>
      <h1>Here is the address list</h1>
      {addresses.map((address: AddressType) => (
        <div
          style={{
            height: "200px",
            width: "400px",
            border: "1px solid red",
            borderRadius: "12px",
            display: "flex",
            gap: "12px",
          }}
          key={address.id}
        >
          <div>
            <h3>Address: {address.address}</h3>
            {address.persons && (
              <div>
                <p>List of people with the above address {address.persons.length}</p>
              </div>
            )}
            {address.persons &&
              address.persons.map((person, idx) => (
                <div key={person.id}>
                  <p>
                    {idx + 1}: name: {person.name}, age: {person.age}, email: {person.email}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
