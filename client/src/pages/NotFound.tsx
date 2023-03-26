import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import logo from "/recycleLogo.jpg";

const NotFound: FC = () => {
  const { t } = useTranslation("translation");
  return (
    <div className="flex-container">
      <Card>
        <img src={logo} width="80px" alt="recycle-logo" />
        <div className="w-3/6">
          <h1 className="text-3xl font-bold">{t("Oops")}</h1>
          <p>{t("Links")}</p>
          <div className="flex flex-row gap-4">
            <Button>
              <Link to="/login">{t("Login")}</Link>
            </Button>
            <Button>
              <Link to="/">{t("Home")}</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
