import React, { FC } from "react";
import { FieldError, FieldErrors } from "react-hook-form";

interface Props {
  propsName: string;
  label: string;
  register: any;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  error: FieldError | undefined;
  defaultValue?: any;
}
const FormInput: FC<Props> = ({
  propsName,
  placeholder,
  label,
  type = "text",
  register,
  error,
  defaultValue,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={propsName} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={propsName}
        type={type}
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FormInput;
