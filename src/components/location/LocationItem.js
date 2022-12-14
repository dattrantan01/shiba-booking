import React, { useState } from "react";
import Button from "../button/Button";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../modal/DeleteModal";

const LocationItem = ({
  name,
  description,
  address,
  id,
  handleDeleteLocation,
  imgUrl,
}) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div className="locaion-item bg-white w-[360px] h-[400px] p-3 shadow-md rounded-2xl box-content">
      {showDeleteModal && (
        <DeleteModal
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={() => {
            handleDeleteLocation(id);
            setShowDeleteModal(false);
          }}
          message={`Are you sure to delete this?`}
        />
      )}

      <div
        className="w-full h-[200px] cursor-pointer"
        onClick={() => navigate(`/locations/detail/${id}`)}
      >
        <img
          src={imgUrl}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex w-full h-[200px] flex-col px-1 py-1">
        <h2 className="text-xl font-semibold">{name} </h2>
        <p className="text-sm font-medium text-slate-600">{address}</p>
        <p className="truncate mt-2 font-medium">{description}</p>
        <div className="flex flex-row w-full justify-end gap-2 mt-auto">
          <Button
            styleClass="bg-secondary"
            onClick={() => {
              navigate(`/locations/update/${id}`);
            }}
          >
            <AiOutlineEdit />
          </Button>
          <Button onClick={() => setShowDeleteModal(true)}>
            <AiOutlineDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
