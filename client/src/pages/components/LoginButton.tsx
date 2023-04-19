import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const LoginButton = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  if (currentUser !== null) {
    return (
      <div>
        <p>
          You are logged in as {currentUser.name} with role {currentUser.role}
        </p>
        <button onClick={() => setCurrentUser(null)}>log out</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setCurrentUser({ name: "Owais", role: "Admin" })}>
        Log in as Owais (ADMIN)
      </button>
      <button onClick={() => setCurrentUser({ name: "Owais", role: "User" })}>
        Log in as Owais (USER)
      </button>
    </>
  );
};

export default LoginButton;
