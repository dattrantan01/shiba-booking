import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";

import RentBooking from "./RentBooking";

const BookingManagePage = () => {
  const params = useParams();
  const status = params.status;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getBookings = () => {
    setIsLoading(true);
    http
      .get(`booking/bookings/business?status=${status}`)
      .then((res) => {
        console.log(res);
        setBookings(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getBookings();
  }, [status]);
  const handleApprovedBooking = (id) => {
    http
      .put(`booking/bookings/${id}/approve`)
      .then((res) => {
        toast.success("success");
        getBookings();
      })
      .catch((err) => console.log(err));
  };
  const handleRejectBooking = (id) => {
    http
      .put(`booking/bookings/${id}/reject`)
      .then((res) => {
        toast.success("success");
        getBookings();
      })
      .catch((err) => console.log(err));
  };
  const handleDoneDuePayment = (id) => {
    http
      .put(`booking/bookings/${id}/done`)
      .then((res) => {
        toast.success(res);

        getBookings();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDoneExtendDue = (id) => {
    http
      .put(`booking/bookings/${id}/done`)
      .then((res) => {
        toast.success(res);

        getBookings();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="px-5 pt-5 w-full">
      {isLoading ? (
        <div className="w-9 h-9 border-8 rounded-full border-t-transparent animate-spin border-slate-400 mx-auto"></div>
      ) : (
        <div className="grid grid-cols-1  gap-6 w-full">
          {bookings.map((item) => {
            return (
              <RentBooking
                key={item.id}
                id={item.id}
                roomName={item.roomName}
                userName={item.userName}
                startDate={item.startDay}
                monthRent={item.monthNumber}
                status={item.status}
                utilities={item.utilities}
                handleApprovedBooking={handleApprovedBooking}
                handleRejectBooking={handleRejectBooking}
                handleDoneExtendDue={handleDoneExtendDue}
                handleDoneDuePayment={handleDoneDuePayment}
                overDueDay={item.overDueDay}
                imgUrl={item.imgUrl}
              ></RentBooking>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingManagePage;
