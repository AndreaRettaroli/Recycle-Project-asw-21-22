import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Basket from "../components/Basket";
import BasketAcquisitionsList from "../components/BasketAcquisitionsList";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Loading from "../components/UI/Loading";
import Navbar from "../components/UI/Navbar";
import { colors } from "../constants/colors";
import useUserSession from "../hooks/useUserSession";
import { deleteBasket, getBaskets, updateBasket } from "../redux/baskets.slice";
import { RootState } from "../redux/store";
import { Basket as BasketModel, BasketDimensions } from "../types/Basket";

interface UpdateBasketFormInput {
  dimension: BasketDimensions;
}

const BasketDetails: FC = () => {
  const { basketId } = useParams();
  const { isLoggedIn, loggedUser } = useUserSession();

  console.log("🚀 ~ file: BasketDetails.tsx:14 ~ basketId:", basketId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchedData = useSelector(
    (state: RootState) => state.baskets.fetchedData
  );
  const baskets = useSelector((state: RootState) => state.baskets.baskets);
  console.log("🚀 ~ file: BasketDetails.tsx:19 ~ baskets:", baskets);

  const basket = baskets?.filter((basket) => basket._id === basketId)[0];
  console.log("🚀 ~ file: BasketDetails.tsx:24 ~ basket:", basket);

  useEffect(() => {
    if (!fetchedData && isLoggedIn && !basket) {
      dispatch(getBaskets(loggedUser.userId, loggedUser.token));
      //setBasket(baskets?.filter((basket) => basket._id === basketId)[0]);
    }
  }, [fetchedData, isLoggedIn, basket]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBasketFormInput>({
    dimension: BasketDimensions.MEDIUM,
  });

  const onSubmit = (data: UpdateBasketFormInput) => {
    console.log("🚀 ~ file: BasketDetails.tsx:55 ~ onSubmit ~ ...basket:", {
      ...basket,
    });
    dispatch(updateBasket({ ...basket, ...data }));
    //navigate("/home");
  };

  const onDelete = () => {
    dispatch(deleteBasket(basket?._id));
    navigate("/home");
  };

  return (
    <>
      <Navbar title={"Basket Details"} />
      {!fetchedData ? (
        <Loading />
      ) : (
        <div className="flex-container ">
          <Card>
            <div className="flex flex-col md:justify-between w-full items-center md:flex-row gap-8">
              <div className="w-48">
                <Basket
                  basket={basket}
                  color={
                    basket
                      ? colors.filter((x) => x.type === basket?.type)[0].color
                      : colors[0].color
                  }
                />
              </div>
              <div className="w-48 h-48">
                <form
                  className="w-full h-full flex flex-col justify-between"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-4 ">
                    <label
                      htmlFor={"dimension"}
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Dimension
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
                  <Button type={"submit"}>Update</Button>
                </form>
              </div>
            </div>
          </Card>
          <Card>
            <BasketAcquisitionsList basketId={basket?._id} />
          </Card>
          <Card>
            <div className="w-full  py-3 ">
              <Button type="button" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default BasketDetails;
