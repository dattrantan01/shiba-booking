import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import BusinessPage from "../../pages/BusinessPage";
import BusinessLocalPage from "./BusinessLocalPage";

const Business = () => {
  const { user } = useAuth();
  const checkUser = localStorage.getItem("token");
  console.log(user);
  if (!checkUser) {
    return <Navigate to={"/login"} />;
  }
  return user?.role?.name === "SUPER_ADMIN" ? (
    <BusinessPage />
  ) : (
    <BusinessLocalPage />
  );
};

export default Business;
