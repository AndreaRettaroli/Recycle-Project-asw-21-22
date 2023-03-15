import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RootState } from "../redux/store";
import Api from "../api/Api";
import { getLoggedUser, setAuthUser } from "../redux/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { Credentials } from "../types/Credentials";
import { Link, useNavigate } from "react-router-dom";
import useUserSession from "../hooks/useUserSession";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import FormInput from "../components/UI/FormInput";
import logo from "../assets/recycleLogo.jpg";

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
    <div className="flex-container login">
      <Card>
        <img src={logo} width="80px" alt="recycle-logo" />
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            propsName={"email"}
            label={"Email"}
            type="email"
            register={{
              ...register("email", { required: "This field is required" }),
            }}
            placeholder={"Enter your email"}
            error={errors?.email}
          />
          <FormInput
            propsName={"password"}
            label={"Password"}
            type="password"
            register={{
              ...register("password", { required: "This field is required" }),
            }}
            placeholder={"Enter your password"}
            error={errors?.password}
          />
          <Button type={"submit"}>Login</Button>
        </form>
        <Link className="m-auto underline" to={"/signup"}>
          Sign Up
        </Link>
      </Card>
    </div>
  );
};

export default Login;
