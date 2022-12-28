import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const booking = [
  {
    name: "Pending",
    url: "/booking/1",
    color: "text-yellow-400",
  },
  {
    name: "Approved",
    url: "/booking/2",
    color: "text-green-400",
  },
  {
    name: "Reject",
    url: "/booking/3",
    color: "text-red-400",
  },
  {
    name: "Success",
    url: "/booking/4",
    color: "text-purple-400",
  },
  {
    name: "Due Payment ",
    url: "/booking/5",
    color: "text-pink-400",
  },
  {
    name: "Extend Due Booking",
    url: "/booking/6",
    color: "text-orange-400",
  },
  {
    name: "Done",
    url: "/booking/7",
    color: "text-black",
  },
];
const BookingPage = () => {
  return (
    <div className="w-full flex flex-col px-5 mt-4">
      <div className="w-full flex flex-col h-fit shadow-lg rounded-lg pt-5">
        <div className="w-full flex flex-row h-[60px]">
          {booking.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.url}
                className={({ isActive }) =>
                  `h-full w-[calc(100%/7)] font-semibold ${
                    item.color
                  } cursor-pointer hover:bg-green-50 flex justify-center items-center ${
                    isActive ? "bg-green-50" : "bg-transparent"
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="w-full min-h-[calc(100vh-100px)] shadow-lg">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BookingPage;
