import React from "react";

const Label = ({ name, children }) => {
  return (
    <label
      htmlFor={name}
      className="cursor-pointer font-semibold inline-block  min-w-[150px]"
    >
      {children}
    </label>
  );
};

export default Label;
