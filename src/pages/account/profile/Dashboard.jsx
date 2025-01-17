import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  const navigation = [
    { name: "Dashboard", to: "/users/profile", icon: HomeIcon, current: false },
    {
      name: "Purchase history",
      to: "/users/profile/your-courses",
      icon: FolderIcon,
      current: false,
    },
    {
      name: "Your profile",
      to: "/users/profile/your-profile",
      icon: UsersIcon,
      current: false,
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="w-[25vw] lg:w-[20vw] min-h-[100vh] bg-[#3B82F6]">
      <ul className="pt-5">
        {navigation.map((item) => (
          <li key={item.name} className="p-1 md:p-3">
            <NavLink
              to={item.to}
              className={classNames(
                item.current
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                "group flex items-center gap-x-1 md:gap-x-3 lg:text-2xl rounded-md py-1 md:p-2 text-[10px] md:text-sm/6 font-semibold"
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
  );
};

export default Dashboard;
