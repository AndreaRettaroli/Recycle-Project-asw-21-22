import React, { FC } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/UI/Navbar";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBasket } from "../redux/baskets.slice";
import { BasketDimensions, BasketTypes } from "../types/Basket";
import { useTranslation } from "react-i18next";

interface AddBasketFormInput {
  type: BasketTypes;
  dimension: BasketDimensions;
}

const AddBasket: FC = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const { register, handleSubmit } = useForm<AddBasketFormInput>({
    defaultValues: {
      type: BasketTypes.MIXED,
      dimension: BasketDimensions.MEDIUM,
    },
  });

  const onSubmit = (data: Partial<AddBasketFormInput>) => {
    dispatch(createBasket({ ...data, userId: user?._id }));
    navigate("/");
  };

  return (
    <>
      <Navbar title={t("Add Basket")} />
      <div className="flex-container">
        <Card>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor={"type"}
                className="block text-gray-700 font-bold mb-2"
              >
                {t("Type of basket")}
              </label>
              <select
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("type")}
                defaultValue={BasketTypes.MIXED}
              >
                <option value={BasketTypes.MIXED}>{t("Mixed")}</option>
                <option value={BasketTypes.ORGANIC}>{t("Organic")}</option>
                <option value={BasketTypes.PLASTIC}>{t("Plastic")}</option>
                <option value={BasketTypes.GLASS}>{t("Glass")}</option>
                <option value={BasketTypes.METALS}>{t("Metals")}</option>
                <option value={BasketTypes.PAPER}>{t("Paper")}</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={"dimension"}
                className="block text-gray-700 font-bold mb-2"
              >
                {t("Dimension")}
              </label>
              <select
                id="dimension"
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("dimension")}
                defaultValue={BasketDimensions.MEDIUM}
              >
                <option value={BasketDimensions.SMALL}>{t("Small")}</option>
                <option value={BasketDimensions.MEDIUM}>{t("Medium")}</option>
                <option value={BasketDimensions.LARGE}>{t("Large")}</option>
              </select>
            </div>
            <Button type={"submit"}>{t("Create")}</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddBasket;
