import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../button/Button";

const DeleteModal = ({ handleClose, message, handleDelete }) => {
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
      <div className="relative z-10 rounded-lg w-full max-w-[400px] h-[150px] bg-white  px-5 py-5 flex flex-col items-center justify-between">
        <h2 className="text-xl font-semibold">{message}</h2>
        <div className="flex flex-row gap-3">
          <Button onClick={handleDelete} styleClass={"bg-green-600"}>
            Yes
          </Button>
          <Button onClick={handleClose} styleClass={"bg-slate-600"}>
            No
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default DeleteModal;
