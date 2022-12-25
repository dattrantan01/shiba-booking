import React from "react";
import { useState } from "react";

const Rating = ({
  readonly = false,
  averageRating = 0,
  handleRating = () => {},
  rating,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    if (readonly) return;
    setHoverRating(index);
  };
  const handleMouseLeave = (index) => {
    if (readonly) return;
    setHoverRating(0);
  };
  const getColor = (index) => {
    if (hoverRating >= index) {
      return "text-yellow-400";
    } else if (!hoverRating && rating >= index) {
      return "text-yellow-400";
    }
    return "text-gray-300";
  };
  return (
    <div className="flex items-center">
      {Array(5)
        .fill(0)
        .map((_, i) => i + 1)
        .map((index) => {
          return (
            <svg
              key={index}
              ariaHidden="true"
              className={`w-5 h-5 cursor-pointer ${getColor(index)}`}
              onClick={() => handleRating(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          );
        })}

      {/* <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        4.95 out of 5
      </p> */}
    </div>
  );
};

export default Rating;
