import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import HeaderProfile from "./HeaderProfile";

const Profile = () => {
  return (
    <>
      <HeaderProfile />
      <div className="flex">
        <Dashboard />
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
