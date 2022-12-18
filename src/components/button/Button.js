import React from "react";

const Button = ({ children, onClick, styleClass, isLoading = false }) => {
  return (
    <button
      className={`px-5 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryHover hover:-translate-y-[1px] hover:shadow-2xl ${styleClass}`}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="w-9 h-9 border-8 rounded-full border-t-transparent animate-spin border-slate-300"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
