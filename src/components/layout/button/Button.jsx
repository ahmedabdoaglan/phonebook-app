import React from "react";
import styles from "./button.module.css";
const Button = ({ onClick, children, color }) => {
  const { button, primary } = styles;
  return (
    <button
      className="btn"
      onClick={onClick}
      className={`${button} ${color ? styles[color] : primary}`}
    >
      {children}
    </button>
  );
};

export default Button;
