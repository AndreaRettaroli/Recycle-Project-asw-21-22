import React, { FC, useEffect } from "react";
import Navbar from "../components/UI/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearUser, getLoggedUser, updateUser } from "../redux/user.slice";
import useUserSession from "../hooks/useUserSession";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import FormInput from "../components/UI/FormInput";
import Loading from "../components/UI/Loading";
import { Languages } from "../types/Languages";
import { useTranslation } from "react-i18next";

export interface SignUpFormInput {
  name: string;
  surname: string;
  email: string;
  address: string;
  province: string;
  language: Languages;
}

const Profile: FC = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const { isLoggedIn, loggedUser, logout } = useUserSession();

  useEffect(() => {
    console.log(
      "🚀 ~ file: Home.tsx:21 ~ useEffect ~ isLoggedIn && !user:",
      isLoggedIn && !user,
      loggedUser,
      user
    );
    if (isLoggedIn && !user) {
      dispatch(getLoggedUser(loggedUser.userId));
    }
  }, [isLoggedIn, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //watch,
  } = useForm<SignUpFormInput>({
    defaultValues: {
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      address: user?.address,
      province: user?.province,
      language: user?.language,
    },
  });

  const onSubmit = (data: SignUpFormInput) => {
    dispatch(updateUser(data));
  };

  const userLogout = (event: Event) => {
    event.preventDefault();
    logout();
    dispatch(clearUser());
  };

  return (
    <>
      <Navbar title={user ? user?.name + t("Profile") : t("Loading Profile")} />
      {!user && loggedUser ? (
        <Loading />
      ) : (
        <div className="flex-container">
          <Card>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                  defaultValue={user?.name}
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
                  defaultValue={user?.surname}
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
                  defaultValue={user?.email}
                />
                {/* <FormInput
                  type="password"
                  propsName={"password"}
                  label={"Password"}
                  register={{
                    ...register("password", {
                      required: t<string>("This field is required."),
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
                      required: t<string>("This field is required."),
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
                /> */}
                <FormInput
                  propsName={"address"}
                  label={t("Address")}
                  register={{
                    ...register("address", {
                      required: t<string>("This field is required."),
                    }),
                  }}
                  placeholder={t("Address")}
                  error={errors.address}
                  defaultValue={user?.address}
                />
                <FormInput
                  propsName={"province"}
                  label={t("Province")}
                  register={{
                    ...register("province", {
                      required: t<string>("This field is required."),
                    }),
                  }}
                  placeholder={t("Province")}
                  error={errors.province}
                  defaultValue={user?.province}
                />
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
                    defaultValue={user?.language}
                  >
                    <option value={Languages.ITALIAN}>{t("Italian")}</option>
                    <option value={Languages.ENGLISH}>{t("English")}</option>
                  </select>
                </div>
              </div>
              <Button type="submit">{t("Update")}</Button>
            </form>
          </Card>
          <Card>
            <div className="w-full  py-3 ">
              <Button type="button" onClick={userLogout}>
                {t("Logout")}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
export default Profile;
