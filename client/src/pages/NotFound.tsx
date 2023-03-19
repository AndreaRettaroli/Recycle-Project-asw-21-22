import React, { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import logo from "/recycleLogo.jpg";

const NotFound: FC = () => {
  return (
    <div className="flex-container">
      <Card>
        <img src={logo} width="80px" alt="recycle-logo" />
        <div className="w-3/6">
          <h1 className="text-3xl font-bold">Oops! You seem to be lost.</h1>
          <p>Here are some helpful links:</p>
          <div className="flex flex-row gap-4">
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/home">Home</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
