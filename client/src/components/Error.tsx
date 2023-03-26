import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { clearError } from "../redux/error.slice";
import { AppDispatch } from "../redux/store";

interface Props {
  message: string;
}

const Error: FC<Props> = ({ message }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const refresh = () => {
    dispatch(clearError());
    navigate(0);
  };
  const { t } = useTranslation("translation");
  return (
    <div className="flex-container">
      <Card>
        <div className="w-3/6">
          <h1 className="text-3xl font-bold">{t("onError")}</h1>
          <p>{t(message)}</p>
          <div className="flex flex-row gap-4">
            <Button onClick={refresh}>{t("Retry")}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Error;
