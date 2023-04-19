import React from "react";

const Panel = ({ title, children }: any) => {
  return (
    <section className="panel" style={{ marginBottom: "10px" }}>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

export default Panel;
