import React from "react";

const Button = ({ children, onCick, styleClass }) => {
  return (
    <button
      className={`px-5 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryHover hover:-translate-y-[1px] hover:shadow-2xl ${styleClass}`}
      onClick={onCick}
    >
      {children}
    </button>
  );
};

export default Button;
