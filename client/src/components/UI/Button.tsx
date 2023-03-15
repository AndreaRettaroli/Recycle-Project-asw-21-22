import React, { FC } from "react";

interface Props {
  onClick?: (event: any) => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, type = "button", children }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
