import React from "react";

const Field = ({ row = false, children }) => {
  return (
    <div
      className={`flex ${
        row ? "flex-row items-center mb-6" : "flex-col items-start mb-6 gap-3"
      }`}
    >
      {children}
    </div>
  );
};

export default Field;
