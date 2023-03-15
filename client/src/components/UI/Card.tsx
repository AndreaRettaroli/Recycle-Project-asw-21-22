import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Card: FC<Props> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
