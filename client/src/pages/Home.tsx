import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


const Home = () => {
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
      <h1>Welcome - Frontpage</h1>
      <h3>Paths to check out:</h3>
      <p>/persons</p>
      <p>/addresses</p>
    </div>
  );
};

export default Home;
