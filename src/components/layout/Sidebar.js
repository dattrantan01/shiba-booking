import React from "react";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { NavLink } from "react-router-dom";

const items = [
  {
    icon: <MdOutlineMapsHomeWork></MdOutlineMapsHomeWork>,
    title: "Locations",
    path: "/locations",
  },
  {
    icon: <HiOutlineUsers></HiOutlineUsers>,
    title: "Users",
    path: "/users",
  },
  {
    icon: <MdOutlineBusinessCenter></MdOutlineBusinessCenter>,
    title: "Business",
    path: "/business",
  },
];

const Sidebar = () => {
  return (
    <div className="w-[300px] h-full bg-orange-100 flex flex-col pt-5 px-3 items-center pb-3 ">
      <div className="font-bungee text-xl ">Shiba booking</div>
      <div className="flex flex-col w-full items-center mt-10 ">
        {items.map((item) => {
          return (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `w-full h-11 font-semibold cursor-pointer flex flex-row items-center justify-start pl-4 hover:bg-orange-50 rounded-lg gap-5 hover:text-orange-500 text-slate-700 ${
                  isActive && "text-orange-500 bg-orange-50"
                }`
              }
            >
              <span className="text-2xl text-orange-700">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="user mt-auto w-full h-12 flex flew-row gap-3 items-center px-1 bg-orange-50 rounded-lg">
        <div className="w-11 h-11">
          <img
            src="https://images.unsplash.com/photo-1666884549364-9754b21d07d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Tôn Nữ Hoàng Giang</span>
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
