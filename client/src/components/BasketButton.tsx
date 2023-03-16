import React, { FC } from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { Link } from "react-router-dom";
const BasketButton: FC = () => {
  return (
    <Card>
      <Link to="/add-basket">
        <div className="h-48 flex w-48 flex-col gap-8 items-center">
          <h3 className="text-3xl font-bold mb-2 text-center">Add Basket</h3>
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect x="20" y="0" width="10" height="50" fill="#000" />
            <rect x="0" y="20" width="50" height="10" fill="#000" />
          </svg>
        </div>
      </Link>
    </Card>
  );
};

export default BasketButton;
