import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import Api from "../api/Api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import FormInput from "../components/UI/FormInput";
import useUserSession from "../hooks/useUserSession";
import { AppDispatch } from "../redux/store";
import { setAuthUser } from "../redux/user.slice";
import { Languages } from "../types/Languages";
import logo from "/recycleLogo.jpg";

interface SignUpFormInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  address: string;
  province: string;
  language: Languages;
}

export const Signup: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoggedIn, loggedUser, login, logout } = useUserSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInput>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      repeatPassword: "",
      address: "",
      province: "",
      language: Languages.ITALIAN,
    },
  });
  const onSubmit = (data: SignUpFormInput) => {
    signup(data);
  };

  const signup = async (data: SignUpFormInput) => {
    try {
      const response = await Api.post("/api/signup", data);
      if (response.status === 200) {
        dispatch(setAuthUser(response.data));
        login(response.data.token, response.data._id);
        navigate("/home");
      }
    } catch (err) {}
  };

  const password = React.useRef({});
  password.current = watch("password", "");

  return (
    <div className="flex-container">
      <Card>
        <img src={logo} width="80px" alt="recycle-logo" />
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-container">
            <FormInput
              propsName={"name"}
              label={"Name"}
              register={{
                ...register("name", { required: "This field is required." }),
              }}
              placeholder={"Name"}
              error={errors.name}
            />
            <FormInput
              propsName={"surname"}
              label={"Surname"}
              register={{
                ...register("surname", { required: "This field is required." }),
              }}
              placeholder={"Surname"}
              error={errors.surname}
            />
            <FormInput
              type="email"
              propsName={"email"}
              label={"Email"}
              register={{
                ...register("email", {
                  required: "This field is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email",
                  },
                }),
              }}
              placeholder={"Email"}
              error={errors.email}
            />
            <FormInput
              type="password"
              propsName={"password"}
              label={"Password"}
              register={{
                ...register("password", {
                  required: "This field is required.",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*()_+={}[\]|;:"<>,.?/~`])[A-Za-z\d@$!%^&*()_+={}[\]|;:"<>,.?/~`]{8,}$/,
                    message:
                      "Invalid password. Please use a stronger password.",
                  },
                }),
              }}
              placeholder={"Password"}
              error={errors.password}
            />
            <FormInput
              type="password"
              propsName={"repeatPassword"}
              label={"Repeat Password"}
              register={{
                ...register("repeatPassword", {
                  required: "This field is required.",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*()_+={}[\]|;:"<>,.?/~`])[A-Za-z\d@$!%^&*()_+={}[\]|;:"<>,.?/~`]{8,}$/,
                    message:
                      "Invalid password. Please use a stronger password.",
                  },
                }),
              }}
              placeholder={"Repeat Password"}
              error={errors.repeatPassword}
            />
            {/* <FormInput
            propsName={"address"}
            label={"Address"}
            register={{
              ...register("address", { required: "This field is required." }),
            }}
            placeholder={"Address"}
            error={errors.address}
          /> */}
            {/* <FormInput
            propsName={"province"}
            label={"Province"}
            register={{
              ...register("province", { required: "This field is required." }),
            }}
            placeholder={"Province"}
            error={errors.province}
          /> */}
            <div className="mb-4">
              <label
                htmlFor={"language"}
                className="block text-gray-700 font-bold mb-2"
              >
                Language
              </label>
              <select
                id="language"
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("language", {
                  required: "This field is required.",
                })}
                defaultValue={"language"}
              >
                <option value={Languages.ITALIAN}>Italian</option>
                <option value={Languages.ENGLISH}>English</option>
              </select>
            </div>
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
