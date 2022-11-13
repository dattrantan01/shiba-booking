import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/table/Table";
import http from "../config/axiosConfig";

const LocationDetail = () => {
  const param = useParams();
  const id = param.id;
  const [rooms, setRooms] = useState([]);
  const [location, setLocation] = useState();
  const getListRoom = () => {
    http.get(`locations/${id}`).then((res) => {
      setLocation(res.data);
    });
  };
  useEffect(() => {
    getListRoom();
    http.post(`locations/${id}/rooms/all`, {}).then((res) => {
      const listRoom = res?.data?.map((room) => {
        return {
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          price: room.price,
        };
      });
      setRooms(listRoom);
    });
  }, [id]);
  console.log(location);
  const head = ["Name", "Capacity", "Price"];
  const handleDelete = async (id) => {
    if (!location) return;
    http.delete(`locations/${location.id}/rooms/${id}`, {}).then((res) => {
      console.log(res);
      toast.success("Success");
      getListRoom();
    });
  };
  return (
    <div className="p-6">
      <div className="flex flex-row gap-8">
        <div className="w-[250px] min-w-[250px] h-[250px] ">
          <img
            src="https://images.unsplash.com/photo-1667747720016-2adde2c97e2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
            alt=""
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-5 py-4">
          <h1 className="font-semibold text-3xl">{location?.name}</h1>
          <div className="text-xl grid grid-cols-5 gap-4">
            <span className="font-bold">Address: </span>
            <span className="font-medium text-slate-600 col-span-4">
              {`${location?.address}, ${location?.wards}, ${location?.district}, ${location?.city}`}
            </span>

            <span className="font-bold">Description: </span>
            <span className="font-medium text-slate-600 col-span-4">
              {location?.description}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Table handleDelete={handleDelete} data={rooms} head={head}></Table>
      </div>
    </div>
  );
};

export default LocationDetail;
