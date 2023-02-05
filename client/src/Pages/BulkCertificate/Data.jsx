import React from "react";

function Data() {
  const data = [
    {
      name: "Nomekmskdmc",
      age: "djne",
    },
  ];
  return (
    <div>
      {data.map((val) => (
        <h1>val.name</h1>
      ))}
    </div>
  );
}

export default Data;
