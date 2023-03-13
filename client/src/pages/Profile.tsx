import React, { FC, useEffect } from "react";
import Navbar from "../components/UI/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearUser, getLoggedUser, updateUser } from "../redux/user.slice";
import useUserSession from "../hooks/useUserSession";
import { useForm } from "react-hook-form";

interface SignUpFormInput {
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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { isLoggedIn, loggedUser, logout } = useUserSession();
  console.log("🚀 ~ file: Home.tsx:13 ~ user:", user);
  useEffect(() => {
    console.log(
      "🚀 ~ file: Home.tsx:21 ~ useEffect ~ isLoggedIn && !user:",
      isLoggedIn && !user
    );
    if (isLoggedIn && !user) {
      dispatch(getLoggedUser(loggedUser.userId));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInput>({
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
    province: "",
    language: "",
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
    <div>
      <h1 className="text-3xl font-bold underline">Profile!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="name"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="surname"
            className="block text-gray-700 font-bold mb-2"
          >
            Surname
          </label>
          <input
            type="text"
            id="surname"
            placeholder="surname"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.surname ? "border-red-500" : ""
            }`}
            {...register("surname", { required: true })}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm">{errors.surname.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email",
              },
            })}
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
            type="password"
            id="password"
            placeholder="password"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*()_+={}[\]|;:"<>,.?/~`])[A-Za-z\d@$!%^&*()_+={}[\]|;:"<>,.?/~`]{8,}$/,
                message: "Invalid password. Please use a stronger password.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="repeatPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            placeholder="Repeat Password"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.repeatPassword ? "border-red-500" : ""
            }`}
            {...register("repeatPassword", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*()_+={}[\]|;:"<>,.?/~`])[A-Za-z\d@$!%^&*()_+={}[\]|;:"<>,.?/~`]{8,}$/,
                message: "Invalid password. Please use a stronger password.",
              },
            })}
          />
          {errors.repeatPassword && (
            <p className="text-red-500 text-sm">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="address"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address ? "border-red-500" : ""
            }`}
            {...register("address", { required: true })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="province"
            className="block text-gray-700 font-bold mb-2"
          >
            Province
          </label>
          <input
            type="province"
            id="province"
            placeholder="province"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address ? "border-red-500" : ""
            }`}
            {...register("province", { required: true })}
          />
          {errors.province && (
            <p className="text-red-500 text-sm">{errors.province.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-gray-700 font-bold mb-2"
          >
            Language
          </label>
          <input
            type="language"
            id="language"
            placeholder="language"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.address ? "border-red-500" : ""
            }`}
            {...register("language", { required: true })}
          />
          {errors.language && (
            <p className="text-red-500 text-sm">{errors.language.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <button
        onClick={userLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
      <Navbar />
    </div>
  );
};
export default Profile;
