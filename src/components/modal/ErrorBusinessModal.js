import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../button/Button";

const ErrorBusinessModal = ({ handleClose }) => {
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
      <div className="relative z-10 rounded-lg w-full max-w-[1000px] h-[550px]  bg-slate-100 px-5 py-5 flex flex-col">
        <h1 className="text-xl font-bold text-center mt-8">
          Your business is inactivated, please contact Super Admin to create new
          subscription!
        </h1>
        <div className="w-full h-[80%] flex flex-row gap-3 mt-auto">
          <div className="w-[270px] h-full bg-white rounded-xl px-6 pt-6 flex flex-col">
            <div className="w-full h-[120px] mt-[60px]">
              <img src="/bronze.svg" alt="" className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">Bronze</h2>
            <div className="text-xl font-medium text-center mt-5">50$</div>
            <div className="text-xl font-semibold text-center">6 months</div>
            <div className="mt-auto mx-auto mb-3">
              <Button>Check It</Button>
            </div>
          </div>
          <div className="w-[270px] h-full bg-white rounded-xl px-6 pt-6 flex flex-col">
            <div className="w-full h-[120px] mt-[60px]">
              <img src="/silver.svg" alt="" className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">Silver</h2>
            <div className="text-xl font-medium text-center mt-5">100$</div>
            <div className="text-xl font-semibold text-center">12 months</div>
            <div className="mt-auto mx-auto mb-3">
              <Button>Check It</Button>
            </div>
          </div>
          <div className="w-[270px] h-full bg-white rounded-xl px-6 pt-6 flex flex-col">
            <div className="w-full h-[120px] mt-[60px]">
              <img src="/gold.svg" alt="" className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">Gold</h2>
            <div className="text-xl font-medium text-center mt-5">200$</div>
            <div className="text-xl font-semibold text-center">18 months</div>
            <div className="mt-auto mx-auto mb-3">
              <Button>Check It</Button>
            </div>
          </div>
          <div className="w-[270px] h-full bg-white rounded-xl px-6 pt-6 flex flex-col">
            <div className="w-full h-[120px] mt-[60px]">
              <img src="/platinum.svg" alt="" className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">Platinum</h2>
            <div className="text-xl font-medium text-center mt-5">300$</div>
            <div className="text-xl font-semibold text-center">24 months</div>
            <div className="mt-auto mx-auto mb-3">
              <Button>Check It</Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default ErrorBusinessModal;
