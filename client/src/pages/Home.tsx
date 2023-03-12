import React, { FC, useEffect } from "react";
import { RootState } from "../redux/store";
import Loading from "../components/UI/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getBaskets } from "../redux/baskets.slice";

const Home: FC = () => {
  const dispatch = useDispatch();
  const fetchedData = useSelector(
    (state: RootState) => state.baskets.fetchedData
  );
  const user = useSelector((state: RootState) => state.user.user);
  console.log("🚀 ~ file: Home.tsx:13 ~ user:", user)
  // useEffect(() => {
  //   if (!fetchedData) {
  //     dispatch(getBaskets(user?._id, user?.token));
  //   }
  // });
  const baskets = useSelector((state: RootState) => state.baskets.baskets);
  console.log("🚀 ~ file: Home.tsx:19 ~ baskets:", baskets)
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Your Baskets!</h1>
      {!fetchedData ? (
        <Loading />
      ) : (
        <ul>
          {baskets?.map((basket, index) => (
            <li key={"basket-" + index}>{basket._id}</li>
          ))}
          <li>Add</li>
        </ul>
      )}
    </div>
  );
};

export default Home;
