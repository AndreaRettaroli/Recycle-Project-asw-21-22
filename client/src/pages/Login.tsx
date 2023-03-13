import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RootState } from "../redux/store";
import Api from "../api/Api";
import { getLoggedUser, setAuthUser } from "../redux/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { Credentials } from "../types/Credentials";
import { Link, useNavigate } from "react-router-dom";
import useUserSession from "../hooks/useUserSession";

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, loggedUser, login, logout } = useUserSession();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getLoggedUser(loggedUser.userId));
      navigate("/home");
    }
  }, [isLoggedIn]);

  const user = useSelector((state: RootState) => state.user.user);

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
    userLogin(data);
  };

  const userLogin = async (data: Credentials) => {
    try {
      const response = await Api.post("/api/login", data);
      if (response.status === 200) {
        dispatch(setAuthUser(response.data));
        login(response.data.token, response.data._id);
        navigate("/home");
      }
    } catch (err) {
      console.error("🚀 ~ file: Login.tsx:64 ~ userLogin ~ err:", err);
    }
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
          />
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
            Login
          </button>
        </div>
      </form>
      <Link to={"/signup"}>Sign Up</Link>
    </div>
  );
};

export default Login;
