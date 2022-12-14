import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import Table from "../components/table/Table";
import http from "../config/axiosConfig";
import AddRoom from "./AddRoom";
import moment from "moment";
import ModalLoading from "../components/loading/ModalLoading";

const LocationDetail = () => {
  const param = useParams();
  const id = param.id;
  const [rooms, setRooms] = useState([]);
  const [location, setLocation] = useState();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const getDetailRoom = () => {
    setLoading(true);
    http
      .get(`booking/locations/${id}`)
      .then((res) => {
        setLoading(false);
        setLocation(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getListRoom = () => {
    http.post(`booking/locations/${id}/rooms/all`, {}).then((res) => {
      console.log("list room", res);
      const listRoom = res?.data?.response?.map((room) => {
        return {
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          price: room.price,
          availableDay: moment(room.availableDay).format("DD-MM-YYYY") || "",
        };
      });
      setRooms(listRoom);
    });
  };
  useEffect(() => {
    getDetailRoom();
    getListRoom();
  }, [id]);

  const head = ["Name", "Capacity", "Price (VND)", "Start Date"];
  const handleDelete = async (id) => {
    if (!location) return;
    setLoading(true);
    http
      .get(`booking/rooms/${id}`, {})
      .then((res) => {
        setLoading(false);
        toast.success("Success");
        getListRoom();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleClose = () => {
    setShowAddRoom(false);
    getListRoom();
  };
  return (
    <>
      {loading && <ModalLoading />}
      <div className="p-6">
        <div className="flex flex-row gap-8">
          <div className="w-[250px] min-w-[250px] h-[250px] ">
            <img
              src={location?.imgUrl}
              alt=""
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex flex-col gap-5 py-4">
            <h1 className="font-semibold text-3xl">{location?.name}</h1>
            <div className="text-xl grid grid-cols-5 gap-4">
              <span className="font-bold">Address: </span>
              <span className="font-medium text-slate-600 col-span-4">
                {location &&
                  `${location?.address}, ${location?.wards}, ${location?.district}, ${location?.city}`}
              </span>

              <span className="font-bold">Description: </span>
              <span className="font-medium text-slate-600 col-span-4">
                {location?.description}
              </span>
            </div>
          </div>
          <div className="w-[200px] h-[100px]">
            <Button onClick={() => setShowAddRoom(true)}>Add room</Button>
          </div>
        </div>
        <div className="mt-12">
          <Table
            handleDelete={handleDelete}
            linkTo={"/room/"}
            data={rooms}
            head={head}
          ></Table>
        </div>
      </div>
      {showAddRoom && (
        <AddRoom locationId={location?.id} handleClose={handleClose}></AddRoom>
      )}
    </>
  );
};

export default LocationDetail;
