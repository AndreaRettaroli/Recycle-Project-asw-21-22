import { FC, useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import Loading from "../components/UI/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getBaskets } from "../redux/baskets.slice";
import { getLoggedUser } from "../redux/user.slice";
import useUserSession from "../hooks/useUserSession";
import Navbar from "../components/UI/Navbar";
import Basket from "../components/Basket";
import Card from "../components/UI/Card";
import BasketButton from "../components/BasketButton";
import { colors } from "../constants/colors";
import { useTranslation } from "react-i18next";
import ErrorMessage from "../components/Error";

const Home: FC = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loggedUser } = useUserSession();
  const error = useSelector((state: RootState) => state.error);
  const fetchedData = useSelector(
    (state: RootState) => state.baskets.fetchedData
  );
  const baskets = useSelector((state: RootState) => state.baskets.baskets);
  const user = useSelector((state: RootState) => state.user.user);
  console.log("🚀 ~ file: Home.tsx:13 ~ user:", user);
  useEffect(() => {
    console.log(
      "🚀 ~ file: Home.tsx:21 ~ useEffect ~ isLoggedIn && !user:",
      isLoggedIn && !user
    );
    if (isLoggedIn && !user) {
      dispatch(getLoggedUser(loggedUser.userId));
    }
    if (!fetchedData && isLoggedIn) {
      dispatch(getBaskets(loggedUser.userId));
    }
  }, [fetchedData, isLoggedIn, user]);

  console.log("🚀 ~ file: Home.tsx:19 ~ baskets:", baskets);
  return (
    <>
      <Navbar title={t("Your Baskets")} />
      {error.isOnErrorState ? (
        <ErrorMessage message={error.errorMessage} />
      ) : !fetchedData ? (
        <Loading />
      ) : (
        <div className="w-4/5 flex-container">
          <Card>
            <div className="home-grid-container">
              {baskets?.map((basket: any, index) => (
                <Basket
                  key={"basket-" + index}
                  basket={basket}
                  color={colors.filter((x) => x.type === basket.type)[0].color}
                />
              ))}
              {baskets?.length < 6 && <BasketButton />}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Home;
