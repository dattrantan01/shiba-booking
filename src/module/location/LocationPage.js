import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import LocationItem from "../../components/location/LocationItem";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import http from "../../config/axiosConfig";

const LocationPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const getLocations = () => {
    http.get(`booking/locations/business`).then((res) => {
      console.log(res);
      setLocations(res.data);
    });
  };
  useEffect(() => {
    getLocations();
  }, []);

  const handleDeleteLocation = (id) => {
    http.delete(`booking/locations/${id}`).then((res) => {
      if (res.status === 200) {
        getLocations();
      }
    });
  };
  return (
    <div className="p-8 w-full h-full">
      <div className="search flex flex-row justify-center items-center gap-2">
        <div className="relative">
          <input
            className="pl-5 pr-7 py-3 outline-none border border-slate-300 rounded-lg w-[500px]"
            type="text"
            placeholder="Search . . . "
          />
          <BsSearch className="absolute right-[10px] top-[35%]" />
        </div>
        <Button>Search</Button>
        <Button onClick={() => navigate("/locations/add")}>
          <div className="flex flex-row items-center gap-1 font-semibold">
            <AiOutlinePlus className="text-2xl" />
            <span>Add Location</span>
          </div>
        </Button>
      </div>
      <div className="location-list grid grid-cols-3 gap-1 w-full gap-y-3 mt-10">
        {locations.map((location) => {
          const address = `${location.wards}, ${location.district}, ${location.city}`;
          return (
            <LocationItem
              key={location.id}
              name={location.name}
              description={location.description}
              address={address}
              id={location.id}
              imgUrl={location.imgUrl}
              handleDeleteLocation={handleDeleteLocation}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LocationPage;
