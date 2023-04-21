import { changeLanguage } from "i18next";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import Api from "../api/Api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import FormInput from "../components/UI/FormInput";
import useUserSession from "../hooks/useUserSession";
import { setError } from "../redux/error.slice";
import { AppDispatch, RootState } from "../redux/store";
import { setAuthUser } from "../redux/user.slice";
import { Languages } from "../types/Languages";
import logo from "/recycleLogo.jpg";
import ErrorMessage from "../components/Error";

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
  const { t } = useTranslation("translation");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const error = useSelector((state: RootState) => state.error);
  const { login } = useUserSession();

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
        changeLanguage(response.data.language);
        dispatch(setAuthUser(response.data));
        login(response.data.token, response.data._id);
        navigate("/");
      } else {
        dispatch(setError({ errorMessage: "Fail to Signup" }));
      }
    } catch (err) {
      dispatch(setError({ errorMessage: "Fail to Signup" }));
    }
  };

  const password = React.useRef({});
  password.current = watch("password", "");

  return (
    <div className="flex-container">
      {error.isOnErrorState ? (
        <ErrorMessage message={error.errorMessage} />
      ) : (
        <Card>
          <img src={logo} width="80px" alt="recycle-logo" />
          <h1 className="text-3xl font-bold mb-6 text-center">
            {t("Sign Up")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-container">
              <FormInput
                propsName={"name"}
                label={t("Name")}
                register={{
                  ...register("name", {
                    required: t<string>("This field is required."),
                  }),
                }}
                placeholder={t("Name")}
                error={errors.name}
              />
              <FormInput
                propsName={"surname"}
                label={t("Surname")}
                register={{
                  ...register("surname", {
                    required: t<string>("This field is required."),
                  }),
                }}
                placeholder={t("Surname")}
                error={errors.surname}
              />
              <FormInput
                type="email"
                propsName={"email"}
                label={"Email"}
                register={{
                  ...register("email", {
                    required: t<string>("This field is required."),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("Invalid Email"),
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
                    required: t<string>("This field is required."),
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*()_+={}[\]|;:"<>,.?/~`])[A-Za-z\d@$!%^&*()_+={}[\]|;:"<>,.?/~`]{8,}$/,
                      message: t("Invalid password."),
                    },
                  }),
                }}
                placeholder={"Password"}
                error={errors.password}
              />
              <FormInput
                type="password"
                propsName={"repeatPassword"}
                label={t("Repeat Password")}
                register={{
                  ...register("repeatPassword", {
                    required: t<string>("This field is required."),
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*()_+={}[\]|;:"<>,.?/~`])[A-Za-z\d@$!%^&*()_+={}[\]|;:"<>,.?/~`]{8,}$/,
                      message:
                        "Invalid password. Please use a stronger password.",
                    },
                  }),
                }}
                placeholder={t("Repeat Password")}
                error={errors.repeatPassword}
              />
              {/* <FormInput
            propsName={"address"}
            label={"Address"}
            register={{
              ...register("address", { required: t<string>("This field is required.") }),
            }}
            placeholder={"Address"}
            error={errors.address}
          /> */}
              {/* <FormInput
            propsName={"province"}
            label={"Province"}
            register={{
              ...register("province", { required: t<string>("This field is required.") }),
            }}
            placeholder={"Province"}
            error={errors.province}
          /> */}
              <div className="mb-4">
                <label
                  htmlFor={"language"}
                  className="block text-gray-700 font-bold mb-2"
                >
                  {t("Language")}
                </label>
                <select
                  id="language"
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("language", {
                    required: t<string>("This field is required."),
                  })}
                  defaultValue={"language"}
                >
                  <option value={Languages.ITALIAN}>{t("Italian")}</option>
                  <option value={Languages.ENGLISH}>{t("English")}</option>
                </select>
              </div>
            </div>
            <Button type="submit">{t("Sign Up")}</Button>
          </form>
          <Link className="m-auto underline" to={"/login"}>
            {t("Login")}
          </Link>
        </Card>
      )}
    </div>
  );
};

export default Signup;
