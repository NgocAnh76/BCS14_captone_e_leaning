import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UserMaster = () => {
  return (
    <div className="">
      <div className="container">
        <div className="bg-bannerLogin bg-cover bg-center absolute inset-0">
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="flex justify-center items-center w-full h-full relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMaster;
