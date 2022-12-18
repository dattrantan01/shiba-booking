import React from "react";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const items = [
  {
    icon: <MdOutlineMapsHomeWork></MdOutlineMapsHomeWork>,
    title: "Locations",
    path: "/locations",
    role: "",
  },
  {
    icon: <HiOutlineUsers></HiOutlineUsers>,
    title: "Users",
    path: "/users",
    role: "SUPER_ADMIN",
  },
  {
    icon: <MdOutlineBusinessCenter></MdOutlineBusinessCenter>,
    title: "Business",
    path: "/businesses",
    role: "",
  },
  {
    icon: <MdOutlineBusinessCenter></MdOutlineBusinessCenter>,
    title: "Subscriptions",
    path: "/subscriptions",
    role: "",
  },
  {
    icon: <MdOutlineBusinessCenter></MdOutlineBusinessCenter>,
    title: "Booking",
    path: "/booking",
    role: "",
  },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="w-[300px] h-full bg-backgroundSidebar shadow-lg flex flex-col pt-5  items-center text-slate-500">
      <div className="font-bungee text-xl text-primary ">Shiba booking</div>
      <div className="flex flex-col w-full items-center mt-10 px-3">
        {items.map((item) => {
          return (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `w-full h-11 font-semibold cursor-pointer flex flex-row items-center justify-start pl-4 hover:border-primary border-l-transparent border-l-4 gap-5 hover:text-primary  ${
                  isActive
                    ? " hover:text-primary  text-primary border-l-primary"
                    : "text-slate-500 hover:border-l-transparent"
                }`
              }
            >
              <span className="text-2xl text-primay">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="user mt-auto w-full h-[70px] flex flew-row gap-3 items-center px-1 py-3 border-t-slate-300 border-t">
        <div className="w-11 h-11">
          <img
            src={user?.avatar}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col text-slate-600">
          <span className="font-semibold">{user?.fullName}</span>
          <span className="text-sm">{user?.role?.name.replace("_", " ")}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
