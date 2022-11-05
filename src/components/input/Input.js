import React from "react";
import { useController } from "react-hook-form";

const Input = ({ name, type = "text", control, ...props }) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });
  return (
    <input
      type={type}
      id={name}
      className="w-full px-3 py-2 rounded-md outline-none border-slate-300 border bg-grayLight focus:border-primary"
      {...field}
      {...props}
    />
  );
};
export default Input;
