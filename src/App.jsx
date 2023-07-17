import React, { useState, useRef, useEffect } from "react";
import { Container, UserForm, LightBox, Button, Input } from "./components";
import UserList from "./components/user/UserList";

const App = () => {
  const [person, setPerson] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggleLightBox, setToggleLightBox] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setLoading(false);
        setPerson((prev) => [...prev, ...data]);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      setPerson((prevState) => prevState.filter((el) => el.id !== id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("can not delete error from server", error.message);
    }
  };

  const selectedUser = useRef("");
  const lightBoxHandler = (toggle) => {
    setToggleLightBox(toggle);
    if (!toggle) selectedUser.current = "";
  };
  const saveUser = async (data) => {
    //
    /*const userExist = person.find((el) => el.id === data.id);
    if (userExist) {
      setPerson(
        person.map((el) => {
          if (el.id === data.id) {
            return { ...data };
          } else {
            return el;
          }
        })
      );
    } else {
      setPerson((prev) => [...prev, data]);
    }*/
    const userExist =
      person.length > 0 && person.find((el) => el.id === data.id);
    setLoading(true);
    if (userExist) {
      try {
        await fetch(`http://localhost:5000/users/${data.id}`, {
          method: "PATCH",
          body: JSON.stringifiy(data),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        setPerson(
          person.map((el) => {
            if (el.id === data.id) {
              return { ...data };
            } else {
              return el;
            }
          })
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("can not delete error from server", error.message);
      }
      // insert user
    } else {
      try {
        const res = await fetch("http://localhost:5000/users/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        });
        const resData = await res.json();
        setPerson((prev) => [...prev, resData]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("can not delete error from server", error.message);
      }
    }
    lightBoxHandler(false);
  };

  const returnPerson =
    search.length > 0
      ? person.length > 0 &&
        person.filter(
          (el) => el.name.includes(search) || el.city.includes(search)
        )
      : person;

  const getUserDataHandler = (data) => {
    selectedUser.current = data;
    lightBoxHandler(true);
  };

  return (
    <Container>
      <Input
        name="filter"
        placeholder="filter"
        value={search.name}
        m
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={() => lightBoxHandler(true)}>isert person</Button>
      {toggleLightBox ? (
        <LightBox closeHandler={() => lightBoxHandler(false)}>
          <UserForm saveUser={saveUser} selectedUser={selectedUser.current} />
        </LightBox>
      ) : null}
      {loading ? (
        <div>
          <p>please loading wait ... </p>
        </div>
      ) : (
        <UserList
          person={returnPerson}
          deleteUser={deleteUser}
          getUserData={getUserDataHandler}
        />
      )}
    </Container>
  );
};

export default App;
