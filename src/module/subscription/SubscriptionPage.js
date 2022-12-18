import React, { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [subList, setSubList] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUserList = () => {
    setIsLoading(true);
    http
      .get(`v1/subscriptions?page=${page}`)
      .then((res) => {
        console.log(res.data);
        const list = res?.data?.rows?.map((item) => {
          const sub = {
            id: item.id,
            business: item.business?.name,
            package: item.package?.name,
            price: item.price,
            start: item.startTime?.slice(0, 10),
            end: item.endTime?.slice(0, 10),
            isDone: item.isDone,
          };
          return sub;
        });

        setSubList(list);
        setPageCount(Math.ceil(res?.data?.count / 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserList();
  }, [page, user]);
  const handleDelete = (id) => {
    // http.delete(`/users/${id}`).then((res) => {
    //   if (res.status === 200) {
    //     getUserList();
    //   }
    // });
  };
  const previousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };
  const nextPage = () => {
    if (page >= pageCount) return;
    setPage(page + 1);
  };

  const head = [
    "Business",
    "Package",
    "Price",
    "Start Time",
    "End Time",
    "Is Done",
  ];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          Subscription Management
        </h1>
        <Button
          onClick={() => navigate("/subscription-add")}
          className="ml-auto"
        >
          Add Subscription
        </Button>
      </div>
      <div className="w-full h-full max-w-[1200px] p-16">
        <Table
          head={head}
          data={subList}
          linkTo=""
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

export default SubscriptionPage;
