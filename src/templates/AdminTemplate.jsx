import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="bg-gray-800 text-white w-64 p-6 flex flex-col space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/user-management"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            User Management
          </NavLink>
          <NavLink
            to="/admin/course-management"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            Course Management
          </NavLink>
        </nav>

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        Admin Panel © 2024 - All Rights Reserved
      </footer>
    </div>
  );
};

export default AdminTemplate;
