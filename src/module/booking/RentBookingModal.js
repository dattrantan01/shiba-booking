import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import http from "../../config/axiosConfig";
import { FiClipboard } from "react-icons/fi";
import {
  MdMeetingRoom,
  MdPeople,
  MdCalendarToday,
  MdFormatListBulleted,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import { status } from "../../utils/status";
import Button from "../../components/button/Button";

const RentBookingModal = ({ handleClose, bookingId }) => {
  const [bookingDetail, setBookingDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    http
      .get(`booking/bookings/${bookingId}`)
      .then((res) => {
        console.log(res.data);
        setBookingDetail(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bookingId]);
  const endDate = moment(bookingDetail?.startDay)
    .add(bookingDetail?.monthNumber, "months")
    .toISOString()
    .slice(0, 10);
  const handleClick = () => {
    const currentStatus = bookingDetail?.status;
    const statusBooking = status[currentStatus];
    handleClose();
    navigate(`/booking/${statusBooking}`);
  };
  if (typeof document === "undefined") return <div className="Modal"></div>;
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div
        onClick={handleClose}
        className="w-8 h-8 absolute top-5 right-5 cursor-pointer z-60"
      >
        <AiOutlineCloseCircle className="w-full h-full" />
      </div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[650px] overflow-y-auto bg-slate-100 px-5 py-5 flex flex-col">
        <h2 className="font-bold text-3xl text-center text-primary">
          #{bookingId}
        </h2>
        <div className="w-full flex flex-col gap-3">
          <div className="w-[250px] h-[250px] mx-auto">
            <img
              src={bookingDetail?.imgUrl}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-2">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdMeetingRoom />
                  <span className="font-semibold">Room name:</span>
                  <span>{bookingDetail?.roomName}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdPeople />
                  <span className="font-semibold">User:</span>
                  <span>{bookingDetail?.userName}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">Month Rent:</span>
                  <span>{bookingDetail?.monthNumber}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">Start Date:</span>
                  <span>{bookingDetail?.startDay.slice(0, 10)}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <FiClipboard />
                  <span className="font-semibold">Status:</span>
                  <div
                    className={`${
                      bookingDetail?.status === "Approved"
                        ? "bg-green-400"
                        : bookingDetail?.status === "Pending"
                        ? "bg-yellow-400"
                        : bookingDetail?.status === "Reject"
                        ? "bg-red-400"
                        : "bg-purple-400"
                    } text-white font-semibold px-2 py-1 rounded-full`}
                  >
                    {bookingDetail?.status}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">End Date:</span>
                  <span>{endDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-row gap-2 items-center">
                <MdFormatListBulleted />
                <span className="font-semibold">Utilities:</span>
              </div>
              <div className="mt-3 ml-5 flex flex-col gap-2 text-base">
                {bookingDetail?.utilities.map((item) => {
                  return (
                    <div className="flex flex-row gap-1 items-center">
                      <IoMdPricetag />
                      <span>{item.name}:</span>
                      <span>{item.price} VND</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto mx-auto">
          <Button onClick={handleClick}>Check It</Button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default RentBookingModal;
