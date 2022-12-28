import React from "react";

const ModalLoading = () => {
  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[550px]  px-5 py-5 flex flex-col">
        <div className="w-[100px] h-[100px] border-8 rounded-full border-t-transparent animate-spin border-slate-300 mx-auto"></div>
      </div>
    </div>
  );
};

export default ModalLoading;
