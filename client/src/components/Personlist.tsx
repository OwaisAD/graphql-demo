import { useQuery, gql } from "@apollo/client";
import { LOAD_PEOPLE } from "../GraphQL/loadPeople.query";
import { useEffect, useState } from "react";

type personType = {
  id: string;
  name: string;
  age: number;
  address: string;
  email: string;
  phone: string;
  image: string;
};

const PersonList = () => {
  const { loading, error, data } = useQuery(LOAD_PEOPLE);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (data) {
      setPeople(data.getAllPeople);
    }
  }, [data]);

  if (loading) return <p>loading...</p>;

  if (error) return <p>Error occured...</p>;

  console.log(data);

  return (
    <div>
      <h1>Here is the personlist</h1>
      {people.map((person: personType) => (
        <div
          style={{
            height: "200px",
            width: "400px",
            border: "1px solid red",
            borderRadius: "12px",
            display: "flex",
            gap: "12px",
          }}
          key={person.id}
        >
          <div>
            <h3>Welcome {person.name}</h3>
            <p>Email: {person.email}</p>
            <p>Age: {person.age}</p>
            <p>Adress: {person.address}</p>
            <p>Phone: {person.phone}</p>
          </div>
          <div>
            {person.image && (
              <img
                src={person.image}
                alt="person image"
                style={{ height: "150px", width: "150px", objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonList;
