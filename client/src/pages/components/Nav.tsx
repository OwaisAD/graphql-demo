import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/persons")}>/persons</button>
      <button onClick={() => navigate("/addresses")}>/addresses</button>
    </div>
  );
};

export default Header;
