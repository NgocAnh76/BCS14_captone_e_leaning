import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Profiles = () => {
  const [open, setOpen] = useState(true);
  const navigation = [
    { name: "Dashboard", to: "", icon: HomeIcon, current: false },
    { name: "Purchase history", to: "", icon: FolderIcon, current: false },
    { name: "Setting", to: "", icon: UsersIcon, current: false },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="">
        <div className="bg-[#1F2937] w-full h-14 md:h-20 lg:h-28">
          <NavLink to="/">
            <img
              className="w-40 h-12 md:w-52 md:h-16 lg:w-72 lg:h-24 object-cover md:pt-3"
              src="../../public/logoSybersoft.png"
              alt=""
            />
          </NavLink>
        </div>
        <div className="w-[25vw] lg:w-[20vw] h-[100vh] bg-[#3B82F6]">
          <ul className="pt-5">
            {navigation.map((item) => (
              <li key={item.name} className="p-1 md:p-3">
                <NavLink
                  className={classNames(
                    item.current
                      ? "bg-indigo-700 text-white"
                      : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                    "group flex items-center gap-x-1 md:gap-x-3 lg:text-2xl rounded-md p-2 text-[10px] md:text-sm/6 font-semibold"
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-indigo-200 group-hover:text-white",
                      "size-4 md:size-6 lg:size-9 shrink-0"
                    )}
                  />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profiles;
