import React from "react";
import { useController } from "react-hook-form";

const Toggle = ({ checked, control, name, children, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label
      id={name}
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id={name}
        checked={checked}
        className="sr-only peer"
        {...field}
        {...rest}
      />
      <div className="w-11 h-6 bg-gray-400 rounded-full peer  peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      <span className="ml-5 font-medium">{children}</span>
    </label>
  );
};

export default Toggle;
