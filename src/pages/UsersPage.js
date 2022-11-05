import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import http from "../config/axiosConfig";

const UsersPage = () => {
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
    <div className="w-full h-full max-w-[1200px] p-16">
      <Table
        head={head}
        data={userList}
        linkTo="/users/"
        handleDelete={handleDelete}
      ></Table>
    </div>
  );
};

export default UsersPage;
