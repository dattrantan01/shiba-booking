import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import Table from "../components/table/Table";
import http from "../config/axiosConfig";

const BusinessPage = () => {
  const navigate = useNavigate();
  const [businessList, setBusinessList] = useState([]);
  const getBusinessList = () => {
    http.get("/businesses").then((res) => {
      const list = res?.data?.rows?.map((item) => {
        const user = {
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          active: item.isActive,
        };
        return user;
      });
      setBusinessList(list);
    });
  };
  useEffect(() => {
    getBusinessList();
  }, []);
  const handleDelete = (id) => {
    http.delete(`/businesses/${id}`).then((res) => {
      if (res.status === 200) {
        toast.success("Delete success");
        getBusinessList();
      }
    });
  };
  const head = ["Name", "Email", "Phone number", "Active"];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          Businesses Management
        </h1>
        <Button onClick={() => navigate("/business-add")} className="ml-auto">
          Add Business
        </Button>
      </div>
      <div className="w-full h-full max-w-[1200px] p-16">
        <Table
          head={head}
          data={businessList}
          linkTo="/businesses/"
          handleDelete={handleDelete}
        ></Table>
      </div>
    </div>
  );
};

export default BusinessPage;
