import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({ placeholder = "", edit = false }) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 ${
        edit ? "bg-transparent" : "bg-pink-50"
      }  rounded cursor-pointer font-medium`}
      onClick={edit ? null : toggle}
    >
      <span>{placeholder}</span>
      {edit ? (
        <></>
      ) : (
        <span>
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  );
};

export default Select;
