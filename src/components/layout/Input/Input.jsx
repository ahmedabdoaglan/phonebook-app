import React from "react";
import style from "./input.module.css";
const Input = ({ type = "text", ...rest }) => {
  console.log(rest);
  return <input type={type} {...rest} className={style.input} />;
};

export default Input;
