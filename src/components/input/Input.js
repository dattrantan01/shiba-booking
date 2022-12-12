import React from "react";
import { useController } from "react-hook-form";

const Input = ({ name, type = "text", control, edit = false, ...props }) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });
  return (
    <input
      type={type}
      id={name}
      readOnly={edit}
      className={`w-full px-3 py-2 rounded-md outline-none  ${
        edit
          ? "border-transparent bg-transparent"
          : "border-slate-200 bg-slate-100 focus:border-red-400 border"
      }   `}
      {...field}
      {...props}
    />
  );
};
export default Input;
