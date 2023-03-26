import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  Statistics,
  Profile,
  NotFound,
  AddBasket,
  BasketDetails,
} from "../pages/";
import PrivateRoutes from "./PrivateRoutes";

const Router: React.FC = (): ReactElement => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-basket" element={<AddBasket />} />
        <Route path="/basket-details/:basketId" element={<BasketDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
