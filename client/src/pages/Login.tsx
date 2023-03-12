import React, { FC } from "react";
import { useForm, Resolver } from "react-hook-form";
import { RootState } from "../redux/store";
import api from "../api/Api";
import { setAuthUser } from "../redux/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { Credentials } from "../types/Credentials";
import { getBaskets } from "../redux/baskets.slice";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  console.log("🚀 ~ file: Login.tsx:33 ~ login ~ user:", user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    email: "",
    password: "",
  });

  const onSubmit = (data: Credentials) => {
    console.log(data);
    login(data);
  };

  const login = async (data: Credentials) => {
    const response = await api.post("/api/login", data);
    if (response.status === 200) {
      dispatch(setAuthUser(response.data));
      console.log(
        "🚀 ~ file: Login.tsx:34 ~ login ~ response.data:",
        response.data
      );
      dispatch(getBaskets(response.data._id, response.data.token));
      navigate("/home");
    }
    // console.log("🚀 ~ file: Login.tsx:26 ~ login ~ response:", response);
    // const res = await api.get("/api/user", {
    //   params: { id: "64023aac471e5c26eccd26bd1" },
    //   headers: {
    //     Authorization: `Bearer ${user?.token}`,
    //   },
    // });
    // console.log("🚀 ~ file: Login.tsx:38 ~ login ~ res:", res);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />{" "}
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />{" "}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
