import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup, Home, Statistics, NotFound } from "../pages/";

const Router: React.FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
