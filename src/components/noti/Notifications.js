import React from "react";
import { GoTriangleLeft } from "react-icons/go";

const Notifications = ({ notifications = [], handleClickNoti }) => {
  return (
    <div className="w-[400px] h-[500px] bg-slate-200 absolute shadow left-full z-20 translate-x-5 top-1/4 rounded-xl px-1 pt-3 flex flex-col ">
      <GoTriangleLeft className="absolute z-30 top-[27%] left-0 -translate-x-2/3 text-5xl text-slate-200" />
      <div className="w-full h-full overflow-y-auto flex flex-col gap-1">
        {notifications.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleClickNoti(item)}
              className={`w-full cursor-pointer flex flex-row gap-3 ${
                item.isRead ? "bg-slate-200" : "rounded-xl bg-white"
              }  py-2 px-2`}
            >
              <div className="w-[70px] h-[70px]">
                <img src="/notification.svg" alt="" className="w-full h-full" />
              </div>
              <div className="h-full w-[calc(100%-70px)] text-sm">
                <span className="font-bold">{item.username} </span>
                <span className="font-medium">{item.message}</span>
                <div className="font-semibold text-slate-400 text-xs flex flex-row gap-1 items-center mt-1">
                  {item.createOn?.slice(0, 10)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
