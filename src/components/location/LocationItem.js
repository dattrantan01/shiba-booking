import React from "react";
import Button from "../button/Button";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const LocationItem = () => {
  return (
    <div className="locaion-item bg-white w-[360px] h-[350px] p-3 shadow-md rounded-2xl box-content">
      <div className="w-full h-[200px]">
        <img
          src="https://images.unsplash.com/photo-1665833967684-8a89a61a1883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
          className="w-full h-full object-cove rounded-2xl"
        />
      </div>
      <div className="flex w-full h-[150px] flex-col px-1 py-1">
        <h2 className="text-xl font-semibold">Chung cư cao cấp SHB Đà Nẵng </h2>
        <p className="text-sm font-light text-slate-600">
          30 Nguyễn Văn Linh, Hải Châu, Đà Nẵng
        </p>
        <div className="flex flex-row w-full justify-end gap-2 mt-auto">
          <Button styleClass="bg-secondary">
            <AiOutlineEdit />
          </Button>
          <Button>
            <AiOutlineDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
