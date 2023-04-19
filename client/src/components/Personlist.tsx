import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_PEOPLE } from "../GraphQL/loadPeople.query";
import { useContext, useEffect, useState } from "react";
import { LOAD_ADDRESSES } from "../GraphQL/loadAddresses.query";
import { ADD_PERSON_TO_ADDRESS } from "../GraphQL/addPersonToAddress.mutation";
import { DELETE_PERSON } from "../GraphQL/deletePerson.mutation";
import { UserContext } from "../contexts/UserContext";

type personType = {
  id: string;
  name: string;
  age: number;
  address: string;
  email: string;
  phone: string;
  image: string;
  addresses: [addressType];
};

type addressType = {
  id: string;
  address: string;
};

const PersonList = () => {
  const { loading, error, data } = useQuery(LOAD_PEOPLE);
  const addresses = useQuery(LOAD_ADDRESSES);
  const [people, setPeople] = useState([]);
  const [addressesData, setAddresses] = useState([]);
  const [addPersonToAddress, { data: addData, error: addError }] =
    useMutation(ADD_PERSON_TO_ADDRESS);
  const [deletePerson, { data: deletePersonData, error: deletePersonError }] =
    useMutation(DELETE_PERSON);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      setPeople(data.getAllPeople);
    }
    if (addresses.data) {
      setAddresses(addresses.data.getAllAddresses);
    }
  }, [data, addresses.data]);

  if (loading) return <p>loading...</p>;

  if (error) return <p>Error occured...</p>;

  const handleAddressChange = (personId: string, addressId: string) => {
    addPersonToAddress({ variables: { personId: personId, addressId: addressId } });
    if (addError) {
      console.log(addError);
      return;
    }
  };

  return (
    <div>
      <h1>Here is the personlist</h1>
      {people.map((person: personType) => (
        <div
          style={{
            height: "250px",
            width: "400px",
            border: "1px solid red",
            borderRadius: "12px",
            display: "flex",
            gap: "12px",
            padding: "5px",
            marginBottom: "10px",
          }}
          key={person.id}
        >
          <div>
            <h3>Welcome {person.name}</h3>
            <p>Email: {person.email}</p>
            <p>Age: {person.age}</p>
            <p>Phone: {person.phone}</p>
            <div>
              Current address count {!person.addresses.length ? "None" : person.addresses.length}{" "}
              {person.addresses.length > 0 && (
                <div>
                  {person.addresses.map((address, idx) => (
                    <li key={idx}>{address.address}</li>
                  ))}
                </div>
              )}
            </div>
            {currentUser !== null && currentUser.role === "Admin" && (
              <p>
                Choose address:
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    let personId = person.id;
                    let addressId = e.target.value;

                    console.log(personId);
                    console.log(addressId);

                    let confirmation = confirm(
                      `Are you sure you want to add ${person.name} to the chosen address?`
                    );

                    if (!confirmation) return;

                    handleAddressChange(personId, addressId);
                  }}
                >
                  <option selected disabled>
                    Select an address
                  </option>
                  {addressesData &&
                    addressesData.map((address: addressType) => (
                      <option value={address.id}>{address.address}</option>
                    ))}
                </select>
              </p>
            )}
          </div>
          <div>
            {person.image && (
              <img
                src={person.image}
                alt="person image"
                style={{ height: "150px", width: "150px", objectFit: "cover" }}
              />
            )}
            {currentUser !== null && currentUser.role === "Admin" && (
              <div>
                Delete person{" "}
                <button
                  onClick={() => {
                    console.log("DELETING PERSON WITH ID", person.id);

                    let confirmation = confirm(
                      `Are you sure you want to delete user with id ${person.id}`
                    );

                    if (!confirmation) return;

                    deletePerson({ variables: { deletePersonId: person.id } });
                  }}
                >
                  X
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonList;
