import { createContext, useContext, useEffect, useState } from "react";
import http from "../config/axiosConfig";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const value = { user, setUser };
  useEffect(() => {
    http
      .get("/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};
export { AuthProvider, useAuth };
