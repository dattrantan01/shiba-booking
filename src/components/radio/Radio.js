import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, edit = false, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        disabled={edit}
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-7 h-7 rounded-full ${
            checked ? "bg-primary" : "bg-pink-200"
          }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
