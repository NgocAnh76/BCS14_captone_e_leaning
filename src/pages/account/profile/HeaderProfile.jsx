import React from "react";

import { NavLink } from "react-router-dom";

const HeaderProfile = () => {
  return (
    <div className="bg-[#1F2937] w-full h-14 md:h-20 lg:h-28">
      <NavLink to="/">
        <img
          className="w-40 h-12 md:w-52 md:h-16 lg:w-72 lg:h-24 object-cover md:pt-3"
          src="../../public/logoSybersoft.png"
          alt=""
        />
      </NavLink>
    </div>
  );
};

export default HeaderProfile;
