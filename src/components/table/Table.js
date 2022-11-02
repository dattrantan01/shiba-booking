import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "../button/Button";

const data = [
  {
    name: "Chung cư cao cấp SHB Đà Nẵng",
    address: "30 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    isActive: true,
    desc: "lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore",
  },
  {
    name: "Chung cư cao cấp SHB Đà Nẵng",
    address: "30 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    isActive: true,
    desc: "lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore",
  },
  {
    name: "Chung cư cao cấp SHB Đà Nẵng",
    address: "30 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    isActive: true,
    desc: "lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore",
  },
  {
    name: "Chung cư cao cấp SHB Đà Nẵng",
    address: "30 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    isActive: true,
    desc: "lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore lorem ipsum dolor sit amet, consectetur adip lorem, sed do eiusmod tempor incididunt ut labore",
  },
];
const head = ["Name", "Address", "Active", "Description"];

const Table = () => {
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-red-200">
          <tr>
            <th>ID</th>
            {head.length &&
              head.map((item, index) => {
                return (
                  <th className="px-6 py-4" key={index}>
                    {item}
                  </th>
                );
              })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.values(item).map((value, i) => {
                  return (
                    <td key={i}>
                      {typeof value == "boolean" ? (
                        <span>{value ? "Yes" : "No"}</span>
                      ) : (
                        <div className="text-td">{value}</div>
                      )}
                    </td>
                  );
                })}
                <td>
                  <div className="flex flex-row w-full justify-end gap-2 mt-auto">
                    <Button styleClass="bg-secondary">
                      <AiOutlineEdit />
                    </Button>
                    <Button>
                      <AiOutlineDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
