import React, { useState } from "react";

import Input from "../Input/Input";

const Filter = ({ filterPerson }) => {
  const [input, setInput] = useState("");

  const handler = (e) => {
    setInput(e.target.value);
    filterPerson(input);
  };
  return (
    <div>
      <Input
        name="filter"
        placeholder="filter"
        value={input.name}
        onChange={handler}
      />
    </div>
  );
};

export default Filter;
