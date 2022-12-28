import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";

import RentBooking from "./RentBooking";
import ModalLoading from "../../components/loading/ModalLoading";

const BookingManagePage = () => {
  const params = useParams();
  const status = params.status;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
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
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/approve`)
      .then((res) => {
        toast.success("success");
        setIsLoadingButton(false);
        getBookings();
      })
      .catch((err) => {
        setIsLoadingButton(false);
        toast.error(err.data?.message);
      });
  };
  const handleRejectBooking = (id) => {
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/reject`)
      .then((res) => {
        toast.success("success");
        getBookings();
        setIsLoadingButton(false);
      })
      .catch((err) => {
        setIsLoadingButton(false);
        toast.error(err.data?.message);
      });
  };
  const handleDoneDuePayment = (id) => {
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/done`)
      .then((res) => {
        toast.success(res);
        setIsLoadingButton(false);
        getBookings();
      })
      .catch((err) => {
        setIsLoadingButton(false);
        toast.error(err.data?.message);
      });
  };
  const handleDoneExtendDue = (id) => {
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/done`)
      .then((res) => {
        toast.success(res);
        setIsLoadingButton(false);
        getBookings();
      })
      .catch((err) => {
        setIsLoadingButton(false);
        toast.error(err.data?.message);
      });
  };

  return (
    <div className="px-5 pt-5 w-full">
      {isLoadingButton && <ModalLoading />}
      {isLoading ? (
        <div className="w-9 h-9 border-8 rounded-full border-t-transparent animate-spin border-slate-400 mx-auto"></div>
      ) : (
        <div className="grid grid-cols-1  gap-6 w-full">
          {bookings.length > 0 ? (
            bookings.map((item) => {
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
            })
          ) : (
            <div className="w-[500px] h-[500px] mx-auto">
              <img src="/empty.svg" alt="" className="w-full h-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingManagePage;
