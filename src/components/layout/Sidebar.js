import React, { useEffect, useState } from "react";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { AiOutlineLogout } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import Notifications from "../noti/Notifications";
import http from "../../config/axiosConfig";
import RentBookingModal from "../../module/booking/RentBookingModal";

const items = [
  {
    icon: <MdOutlineMapsHomeWork></MdOutlineMapsHomeWork>,
    title: "Locations",
    path: "/locations",
    role: "SUPER_ADMIN",
  },
  {
    icon: <HiOutlineUsers></HiOutlineUsers>,
    title: "Users",
    path: "/users",
    role: "",
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
    role: "SUPER_ADMIN",
  },
];

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModalDetailBooking, setShowModalDetailBooking] = useState(false);
  const [bookingId, setBookingId] = useState();
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser({
      id: "",
    });
    navigate("/login");
  };
  useEffect(() => {
    http.get(`booking/bookings/noti`).then((res) => {
      setNotifications(res.data);
      const countNoti = res.data?.reduce((accumulator, item) => {
        let read = 0;
        if (!item.isRead) read = 1;
        return accumulator + read;
      }, 0);
      setCount(countNoti);
    });
  }, []);
  useEffect(() => {
    http.get(`booking/bookings/noti`).then((res) => {
      setNotifications(res.data);
      const countNoti = res.data?.reduce((accumulator, item) => {
        let read = 0;
        if (!item.isRead) read = 1;
        return accumulator + read;
      }, 0);
      setCount(countNoti);
    });
  }, [showNotifications]);
  const handleClickNoti = (item) => {
    setShowModalDetailBooking(true);
    setShowNotifications(false);
    setBookingId(item.bookingId);
    const read = item.isRead;
    if (!read) {
      http
        .put(`booking/bookings/noti/${item.id}/isRead`)
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className="relative w-[300px] h-full bg-backgroundSidebar shadow-lg flex flex-col pt-5  items-center text-slate-500">
      {showModalDetailBooking && (
        <RentBookingModal
          handleClose={() => setShowModalDetailBooking(false)}
          bookingId={bookingId}
        />
      )}

      {showNotifications && (
        <Notifications
          notifications={notifications}
          handleClickNoti={handleClickNoti}
        />
      )}
      <NavLink to={"/"} className="font-bungee text-xl text-primary ">
        Shiba booking
      </NavLink>
      <div className="flex flex-col w-full items-center mt-10 px-3">
        {items.map((item) => {
          if (user?.role?.name === item.role) return <></>;
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
        {user?.role?.name !== "SUPER_ADMIN" && (
          <div
            className={`w-full h-11 font-semibold cursor-pointer flex flex-row items-center justify-start pl-4  border-l-transparent border-l-4 gap-5 hover:text-primary ${
              showNotifications ? "text-primary" : ""
            }`}
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <span className="text-2xl text-primay">
              <IoNotifications />
            </span>
            <span>Notifications</span>
            {count > 0 && (
              <div className="w-4 h-4 rounded-full text-xs bg-red-500 text-white font-semibold flex items-center justify-center">
                {count}
              </div>
            )}
          </div>
        )}
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
        <div className="ml-auto">
          {" "}
          <AiOutlineLogout
            onClick={handleSignOut}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
