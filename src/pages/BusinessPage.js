import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import Table from "../components/table/Table";
import http from "../config/axiosConfig";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const BusinessPage = () => {
  const navigate = useNavigate();
  const [businessList, setBusinessList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getBusinessList = () => {
    setIsLoading(true);
    http
      .get(`/businesses?page=${page}&&search=${search}`)
      .then((res) => {
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
        setPageCount(Math.ceil(res?.data?.count / 6));
        setIsLoading(false);
        setBusinessList(list);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getBusinessList();
  }, [page, search]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleDelete = (id) => {
    http.delete(`/businesses/${id}`).then((res) => {
      if (res.status === 200) {
        toast.success("Delete success");
        getBusinessList();
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
          data={businessList}
          linkTo="/businesses/"
          page={page}
          isLoading={isLoading}
          handleDelete={handleDelete}
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

export default BusinessPage;
