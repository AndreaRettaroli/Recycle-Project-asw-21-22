import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Basket from "../components/Basket";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Loading from "../components/UI/Loading";
import Navbar from "../components/UI/Navbar";
import { colors } from "../constants/colors";
import useUserSession from "../hooks/useUserSession";
import { getBaskets, updateBasket } from "../redux/baskets.slice";
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
  const fetchedData = useSelector(
    (state: RootState) => state.baskets.fetchedData
  );
  const baskets = useSelector((state: RootState) => state.baskets.baskets);
  console.log("🚀 ~ file: BasketDetails.tsx:19 ~ baskets:", baskets);

  const basket: BasketModel = baskets?.filter(
    (basket) => basket._id === basketId
  )[0];
  console.log("🚀 ~ file: BasketDetails.tsx:24 ~ basket:", basket);

  useEffect(() => {
    if (!fetchedData && isLoggedIn) {
      dispatch(getBaskets(loggedUser.userId, loggedUser.token));
    }
  }, [fetchedData, isLoggedIn]);

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

  return (
    <>
      <Navbar title={"Basket Details"} />
      {!fetchedData && typeof basket === undefined ? (
        <Loading />
      ) : (
        <div className="flex-container">
          <Card>
            <div className="w-48">
              <Basket
                basket={basket}
                color={colors.filter((x) => x.type === basket?.type)[0].color}
              />
            </div>
            <div>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                <Button type={"submit"}>Update</Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default BasketDetails;
