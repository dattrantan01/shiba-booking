import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";

const RoleNavigate = ({ element }) => {
  const { user } = useAuth();

  console.log("user role navigate", user);

  if (!user.id) {
    return <Navigate to={"/login"} />;
  }

  if (user.role?.name === "LOCAL_ADMIN") {
    toast.error("You must be super-admin");
    return <Navigate to={"/"} />;
  }

  return <>{element}</>;
};

export default RoleNavigate;
