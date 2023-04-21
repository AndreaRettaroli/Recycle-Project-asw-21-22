import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { AppDispatch, RootState } from "../redux/store";
import { BasketDimensions } from "../types/Basket";

interface UpdateBasketFormInput {
  dimension: BasketDimensions;
}

const BasketDetails: FC = () => {
  const { t } = useTranslation("translation");
  const { basketId } = useParams();
  const { isLoggedIn, loggedUser } = useUserSession();

  console.log("🚀 ~ file: BasketDetails.tsx:14 ~ basketId:", basketId);
  const dispatch = useDispatch<AppDispatch>();
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
      dispatch(getBaskets(loggedUser.userId));
    }
  }, [fetchedData, isLoggedIn, basket]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBasketFormInput>({
    defaultValues: {
      dimension: BasketDimensions.MEDIUM,
    },
  });

  const onSubmit = (data: Partial<UpdateBasketFormInput>) => {
    console.log("🚀 ~ file: BasketDetails.tsx:55 ~ onSubmit ~ ...basket:", {
      ...basket,
    });
    dispatch(updateBasket({ ...basket, ...data }));
    navigate("/");
  };

  const onDelete = () => {
    dispatch(deleteBasket(basket?._id));
    navigate("/");
  };

  return (
    <>
      <Navbar title={t("Basket Details")} />
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
                      {t("Dimension")}
                    </label>
                    <select
                      id="dimension"
                      className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("dimension")}
                      defaultValue={BasketDimensions.MEDIUM}
                    >
                      <option value={BasketDimensions.SMALL}>
                        {t("Small")}
                      </option>
                      <option value={BasketDimensions.MEDIUM}>
                        {t("Medium")}
                      </option>
                      <option value={BasketDimensions.LARGE}>
                        {t("Large")}
                      </option>
                    </select>
                  </div>
                  <Button type={"submit"}>{t("Update")}</Button>
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
                {t("Delete")}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default BasketDetails;
