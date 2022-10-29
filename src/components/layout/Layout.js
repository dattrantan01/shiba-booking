import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="w-full h-[100vh] flex">
      <Sidebar></Sidebar>
      <div className="w-full h-full overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
