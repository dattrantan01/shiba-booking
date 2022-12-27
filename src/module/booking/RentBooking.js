import moment from "moment";
import React from "react";
import Button from "../../components/button/Button";
import { FiClipboard } from "react-icons/fi";
import {
  MdMeetingRoom,
  MdPeople,
  MdCalendarToday,
  MdFormatListBulleted,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";

const RentBooking = ({
  roomName,
  userName,
  startDate,
  status,
  monthRent,
  utilities,
  id,
  handleApprovedBooking,
  handleRejectBooking,
  handleDoneExtendDue,
  handleDoneDuePayment,
  overDueDay,
  imgUrl,
}) => {
  const endDate = moment(startDate)
    .add(monthRent, "months")
    .format("DD-MM-YYYY");

  return (
    <div className="relative z-10 rounded-lg w-full bg-slate-100 px-5 py-5 flex flex-col">
      <h2 className="font-bold text-3xl text-center text-primary">#{id}</h2>
      {status === "DuePayment" && (
        <div className="font-semibold text-red-500 absolute top-2 right-9">
          {overDueDay} days left
        </div>
      )}
      <div className="flex flex-row relative gap-3">
        <div className="w-[150px] h-[150px]">
          <img src={imgUrl} alt="" className="object-contain w-full h-full" />
        </div>
        <div className="mt-5 text-lg w-[calc(100%-150px)]">
          <div className="w-full grid grid-cols-2">
            <div>
              <div className="flex flex-row gap-2 items-center">
                <MdMeetingRoom />
                <span className="font-semibold">Room name:</span>
                <span>{roomName}</span>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2 items-center">
                <MdPeople />
                <span className="font-semibold">User:</span>
                <span>{userName}</span>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2 items-center">
                <MdCalendarToday />
                <span className="font-semibold">Month Rent:</span>
                <span>{monthRent}</span>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2 items-center">
                <MdCalendarToday />
                <span className="font-semibold">Start Date:</span>
                <span>{moment(startDate).format("DD-MM-YYYY")}</span>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2 items-center">
                <FiClipboard />
                <span className="font-semibold">Status:</span>
                <div
                  className={`${
                    status === "Approved"
                      ? "bg-green-400"
                      : status === "Pending"
                      ? "bg-yellow-400"
                      : status === "Reject"
                      ? "bg-red-400"
                      : "bg-purple-400"
                  } text-white font-semibold px-2 py-1 rounded-full`}
                >
                  {status}
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
            <div className="mt-3 ml-5 flex flex-row gap-5 text-base">
              {utilities.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-row gap-1 items-center"
                  >
                    <IoMdPricetag />
                    <span>{item.name}:</span>
                    <span>{item.price} VND</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 absolute -top-8 right-5">
          {status === "Pending" && (
            <>
              <button
                onClick={() => handleApprovedBooking(id)}
                className="outline-none px-4 py-2 text-white bg-green-500 rounded-lg max-w-[200px]"
              >
                Approved
              </button>
              <button
                onClick={() => handleRejectBooking(id)}
                className="outline-none px-4 py-2 text-white bg-red-500 rounded-lg max-w-[200px]"
              >
                Reject
              </button>
            </>
          )}
          {status === "DuePayment" && (
            <div className="w-full mt-5 mx-auto max-w-[300px] ">
              <Button onClick={() => handleDoneDuePayment(id)}>Done</Button>
            </div>
          )}
          {status === "ExtendDue" && (
            <div className="w-full mt-5 mx-auto max-w-[300px] ">
              <Button onClick={() => handleDoneExtendDue(id)}>Done</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentBooking;
