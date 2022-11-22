import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import { useAuth } from "../../context/auth-context";
import http from "../../config/axiosConfig";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const FAKE_ID = "6379e87618a1475fea259898";
const UsersPage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const getUserList = () => {
    if (!user.id) return;
    let roleID = "";
    let businessId = "";
    switch (user.role.name) {
      case "SUPER_ADMIN":
        roleID = "636723c71f1cbcef36804e82";
        businessId = "";
        break;
      case "LOCAL_ADMIN":
        roleID = "636723d347707eeadf80eb59";
        businessId = user.businesses[0].id || FAKE_ID;
        break;
      default:
        roleID = FAKE_ID;
        businessId = FAKE_ID;
        break;
    }
    setIsLoading(true);
    http
      .get(
        `/users?roleId=${roleID}&&businessId=${businessId}&&page=${page}&&search=${search}`
      )
      .then((res) => {
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
        setPageCount(Math.ceil(res?.data?.count / 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    getUserList();
  }, [page, user, search]);
  const handleDelete = (id) => {
    http.delete(`/users/${id}`).then((res) => {
      if (res.status === 200) {
        getUserList();
      }
    });
  };
  const previousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };
  const nextPage = () => {
    if (page >= pageCount) return;
    setPage(page + 1);
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
        <div className="mb-3 flex justify-end">
          <input
            type="text"
            className="px-4 py-2 border border-primary rounded-lg outline-none"
            placeholder="Search name, email address, phone number"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Table
          head={head}
          data={userList}
          linkTo="/users/"
          handleDelete={handleDelete}
          page={page}
          isLoading={isLoading}
        ></Table>
        <div className="flex flex-row gap-4 justify-end text-xl items-center mt-4">
          <BiLeftArrow className="cursor-pointer" onClick={previousPage} />
          <span>{page}</span>
          <BiRightArrow className="cursor-pointer" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
