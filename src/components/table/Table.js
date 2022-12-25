import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import DeleteModal from "../modal/DeleteModal";

const Table = ({
  head,
  data,
  linkTo,
  handleDelete,
  page = 1,
  isLoading = false,
  watchOnly = false,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg relative ">
      {isLoading && (
        <div className="w-10 h-10 border-8 inline-block border-t-transparent rounded-full border-red-500 animate-spin fixed z-20 top-[50%] left-[50%]"></div>
      )}
      {showDeleteModal && (
        <DeleteModal
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={() => {
            handleDelete(id);
            setShowDeleteModal(false);
          }}
          message={`Are you sure to delete this?`}
        />
      )}

      <table className="w-full text-sm ">
        <thead className="bg-red-500">
          <tr>
            <th>ID</th>
            {head?.length &&
              head.map((item, index) => {
                return (
                  <th className="px-6 py-4" key={index}>
                    {item}
                  </th>
                );
              })}
            {!watchOnly && <th></th>}
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {data?.length > 0 &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1 + (page - 1) * 6}</td>
                    {Object.values(item)
                      .slice(1, head.length + 1)
                      .map((value, i) => {
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
                    {!watchOnly && (
                      <td>
                        <div className="handle-button flex flex-row w-full justify-end gap-2 mt-auto">
                          <Button
                            styleClass="bg-secondary"
                            onClick={() => navigate(`${linkTo}${item.id}`)}
                          >
                            <AiOutlineEdit />
                          </Button>

                          <Button
                            onClick={() => {
                              setShowDeleteModal(true);
                              setId(item.id);
                            }}
                          >
                            <AiOutlineDelete />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
