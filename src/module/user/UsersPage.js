import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";

import http from "../../config/axiosConfig";

const UsersPage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const getUserList = () => {
    http.get("/users").then((res) => {
      const list = res?.data?.rows?.map((item) => {
        const user = {
          id: item.id,
          fullname: item.fullName,
          email: item.email,
          phone: item.phone,
          gender: item.gender,
        };
        return user;
      });
      setUserList(list);
    });
  };
  useEffect(() => {
    getUserList();
  }, []);
  const handleDelete = (id) => {
    http.delete(`/users/${id}`).then((res) => {
      if (res.status === 200) {
        getUserList();
      }
    });
  };
  const head = ["Full name", "Email", "Phone number", "Gender"];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          Users Management
        </h1>
        <Button onClick={() => navigate("/users-add")} className="ml-auto">
          Add User
        </Button>
      </div>
      <div className="w-full h-full max-w-[1200px] p-16">
        <Table
          head={head}
          data={userList}
          linkTo="/users/"
          handleDelete={handleDelete}
        ></Table>
      </div>
    </div>
  );
};

export default UsersPage;
