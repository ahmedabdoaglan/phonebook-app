import React, { useState } from "react";
import { Container, UserForm, LightBox, Button, Input } from "./components";
import UserList from "./components/user/UserList";

const App = () => {
  const [person, setPerson] = useState([
    {
      id: 1,
      name: "John do",
      phone: "01010111",
      city: "Taxes",
    },
    { id: 2, name: "Kareem nour", phone: "01010111", city: "Giza" },
  ]);
  const [search, setSearch] = useState("");
  const [toggleLightBox, setToggleLightBox] = useState(false);
  const deleteUser = (id) => {
    setPerson((prevState) => prevState.filter((el) => el.id !== id));
  };
  const insertUser = (data) => {
    data.id = Math.floor(Math.random() * 100);
    setPerson((prev) => [...prev, data]);
    setToggleLightBox(false);
  };
  const returnPersons = () => {
    if (search.length > 0) {
      return person.filter(
        (el) => el.name.includes(search) || el.city.includes(search)
      );
    }
    return person;
  };
  return (
    <Container>
      <Input
        name="filter"
        placeholder="filter"
        value={search.name}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={() => setToggleLightBox(true)}>isert person</Button>
      {toggleLightBox ? (
        <LightBox closeHandler={() => setToggleLightBox(false)}>
          <UserForm insertUser={insertUser} />
        </LightBox>
      ) : null}

      <UserList person={returnPersons} deleteUser={deleteUser} />
    </Container>
  );
};

export default App;
