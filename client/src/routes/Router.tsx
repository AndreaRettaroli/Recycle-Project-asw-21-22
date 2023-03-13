import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup, Home, Statistics, Profile, NotFound } from "../pages/";
import PrivateRoutes from "./PrivateRoutes";

const Router: React.FC = (): ReactElement => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
