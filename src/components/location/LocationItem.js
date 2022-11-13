import React from "react";
import Button from "../button/Button";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LocationItem = ({
  name,
  description,
  address,
  id,
  handleDeleteLocation,
}) => {
  const navigate = useNavigate();
  return (
    <div className="locaion-item bg-white w-[360px] h-[350px] p-3 shadow-md rounded-2xl box-content">
      <div
        className="w-full h-[200px] cursor-pointer"
        onClick={() => navigate(`/locations/detail/${id}`)}
      >
        <img
          src="https://images.unsplash.com/photo-1665833967684-8a89a61a1883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
          className="w-full h-full object-cove rounded-2xl"
        />
      </div>
      <div className="flex w-full h-[150px] flex-col px-1 py-1">
        <h2 className="text-xl font-semibold">{name} </h2>
        <p className="text-sm font-light text-slate-600">{address}</p>
        <p className="">{description}</p>
        <div className="flex flex-row w-full justify-end gap-2 mt-auto">
          <Button
            styleClass="bg-secondary"
            onClick={() => {
              navigate(`/locations/update/${id}`);
            }}
          >
            <AiOutlineEdit />
          </Button>
          <Button onClick={() => handleDeleteLocation(id)}>
            <AiOutlineDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
