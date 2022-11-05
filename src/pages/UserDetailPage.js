import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../config/axiosConfig";

const UserDetailPage = () => {
  const { userid } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    http
      .get(`users/${userid}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, [userid, setUser]);

  return (
    <div>
      dat
      {user &&
        Object.values(user).map((item) => {
          return <div>{item}</div>;
        })}
    </div>
  );
};

export default UserDetailPage;
