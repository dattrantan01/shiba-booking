import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import http from "../../config/axiosConfig";
import RentBookingModal from "../rent/RentBookingModal";
import moment from "moment";

const Notification = () => {
  const [showModalDetailBooking, setShowModalDetailBooking] = useState(false);
  const [bookingId, setBookingId] = useState();
  const [showList, setShowList] = useState(false);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
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
  }, [showList]);
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
  const handleShowList = () => {
    setShowList((prev) => !prev);
  };
  const handleClickNoti = (item) => {
    setShowModalDetailBooking(true);
    setShowList(false);
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
    <div className="w-6 h-6 relative cursor-pointer" onClick={handleShowList}>
      {showModalDetailBooking && (
        <RentBookingModal
          handleClose={() => setShowModalDetailBooking(false)}
          bookingId={bookingId}
        />
      )}
      <IoNotifications className="w-full h-full" />
      {count > 0 && (
        <div className="absolute w-4 h-4 rounded-full text-xs bg-red-500 text-white font-semibold -top-2 -right-2 flex items-center justify-center">
          {count}
        </div>
      )}
      {showList && (
        <div className="w-[400px] max-h-[500px] overflow-y-auto pt-3 relative shadow rounded-xl px-1 z-40 bg-slate-200 opacity-100 -translate-x-3/4 translate-y-3  flex flex-col gap-1">
          {notifications.length > 0 ? (
            notifications.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleClickNoti(item)}
                  className={`w-full flex flex-row gap-3 ${
                    item.isRead ? "bg-slate-200" : "rounded-xl bg-white"
                  }  py-2 px-2`}
                >
                  <div className="w-[70px] h-[70px]">
                    <img
                      src="/notification.svg"
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="h-full w-[calc(100%-70px)] text-sm">
                    <span className="font-bold">{item.username} </span>
                    <span className="font-medium">{item.message}</span>
                    <div className="font-semibold text-slate-400 text-xs flex flex-row gap-1 items-center mt-1">
                      {moment(item.createOn).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-[200px] h-[200px] mx-auto">
              <img src="/empty_noti.svg" alt="" className="w-full h-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
