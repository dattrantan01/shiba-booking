import React from "react";

const Label = ({ name, children }) => {
  return (
    <label htmlFor={name} className="cursor-pointer font-medium">
      {children}
    </label>
  );
};

export default Label;
