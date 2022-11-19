import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute z-10 top-full left-0 w-full bg-white shadow-sm max-h-[400px] overflow-y-auto">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
