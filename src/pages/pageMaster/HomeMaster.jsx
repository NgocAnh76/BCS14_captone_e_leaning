import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Home/HomeLayout/Footer";
import Headers from "../Home/HomeLayout/Headers";

const HomeMaster = () => {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeMaster;
