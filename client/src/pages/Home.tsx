import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
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
      <h1>Welcome - Frontpage</h1>
      {currentUser ? (
        <>
          <h3>Paths to check out:</h3>
          <p>/persons</p>
          <p>/addresses</p>
        </>
      ) : (
        <>
          <p>Please login to see the paths</p>
        </>
      )}
    </div>
  );
};

export default Home;
