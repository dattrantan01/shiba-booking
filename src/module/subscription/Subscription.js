import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import SubscriptionLocalPage from "./SubscriptionLocalPage";
import SubscriptionPage from "./SubscriptionPage";

const Subscription = () => {
  const { user } = useAuth();
  const checkUser = localStorage.getItem("token");
  if (!checkUser) {
    return <Navigate to={"/login"} />;
  }
  return user?.role?.name === "SUPER_ADMIN" ? (
    <SubscriptionPage />
  ) : (
    <SubscriptionLocalPage />
  );
};

export default Subscription;
