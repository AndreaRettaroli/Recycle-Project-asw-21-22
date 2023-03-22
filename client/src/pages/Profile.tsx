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

export interface SignUpFormInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  address: string;
  province: string;
  language: string;
}

const Profile: FC = () => {
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
    watch,
  } = useForm<SignUpFormInput>({
    defaultValues: {
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      password: "",
      repeatPassword: "",
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
      <Navbar title={user ? user?.name + " Profile" : "loading Profile"} />
      {!user && loggedUser ? (
        <Loading />
      ) : (
        <div className="flex-container">
          <Card>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid-container">
                <FormInput
                  propsName={"name"}
                  label={"Name"}
                  register={{
                    ...register("name", {
                      required: "This field is required.",
                    }),
                  }}
                  placeholder={"Name"}
                  error={errors.name}
                  defaultValue={user?.name}
                />
                <FormInput
                  propsName={"surname"}
                  label={"Surname"}
                  register={{
                    ...register("surname", {
                      required: "This field is required.",
                    }),
                  }}
                  placeholder={"Surname"}
                  error={errors.surname}
                  defaultValue={user?.surname}
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
                  defaultValue={user?.email}
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
                <FormInput
                  propsName={"address"}
                  label={"Address"}
                  register={{
                    ...register("address", {
                      required: "This field is required.",
                    }),
                  }}
                  placeholder={"Address"}
                  error={errors.address}
                  defaultValue={user?.address}
                />
                <FormInput
                  propsName={"province"}
                  label={"Province"}
                  register={{
                    ...register("province", {
                      required: "This field is required.",
                    }),
                  }}
                  placeholder={"Province"}
                  error={errors.province}
                  defaultValue={user?.province}
                />
                <FormInput
                  propsName={"language"}
                  label={"Language"}
                  register={{
                    ...register("language", {
                      required: "This field is required.",
                    }),
                  }}
                  placeholder={"Language"}
                  error={errors.language}
                  defaultValue={user?.language}
                />
              </div>
              <Button type="submit">Update</Button>
            </form>
          </Card>
          <Card>
            <div className="w-full  py-3 ">
              <Button type="button" onClick={userLogout}>
                Logout
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
export default Profile;
