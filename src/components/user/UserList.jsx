import React from "react";
import UserCard from "./UserCard";

const UserList = ({ person, deleteUser, getUserData }) => {
  const personHandler = person.map((el) => (
    <UserCard
      key={el.id}
      item={el}
      deleteUser={deleteUser}
      getUserData={getUserData}
    />
  ));

  return <div>{personHandler}</div>;
};

export default UserList;
