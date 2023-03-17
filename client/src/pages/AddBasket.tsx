import React, { FC, useEffect } from "react";
import { RootState } from "../redux/store";
import Loading from "../components/UI/Loading";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/UI/Navbar";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import FormInput from "../components/UI/FormInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBasket } from "../redux/baskets.slice";
import { BasketDimensions, BasketTypes } from "../types/Basket";

interface AddBasketFormInput {
  type: BasketTypes;
  dimension: BasketDimensions;
}

const AddBasket: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBasketFormInput>({
    type: BasketTypes.MIXED,
    dimension: BasketDimensions.MEDIUM,
  });

  const onSubmit = (data: AddBasketFormInput) => {
    dispatch(createBasket({ ...data, userId: user?._id }));
    navigate("/home");
  };

  return (
    <>
      <Navbar title="Add Basket" />
      <div className="flex-container">
        <Card>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor={"type"}
                className="block text-gray-700 font-bold mb-2"
              >
                Type of basket:
              </label>
              <select
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("type")}
                defaultValue={BasketTypes.MIXED}
              >
                <option value={BasketTypes.MIXED}>Mixed</option>
                <option value={BasketTypes.ORGANIC}>Organic</option>
                <option value={BasketTypes.PLASTIC}>Plastic</option>
                <option value={BasketTypes.GLASS}>Glass</option>
                <option value={BasketTypes.METALS}>Metals</option>
                <option value={BasketTypes.PAPER}>Paper</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={"dimension"}
                className="block text-gray-700 font-bold mb-2"
              >
                Dimension:
              </label>
              <select
                id="dimension"
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("dimension")}
                defaultValue={BasketDimensions.MEDIUM}
              >
                <option value={BasketDimensions.SMALL}>Small</option>
                <option value={BasketDimensions.MEDIUM}>Medium</option>
                <option value={BasketDimensions.LARGE}>Large</option>
              </select>
            </div>
            <Button type={"submit"}>Create</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddBasket;
