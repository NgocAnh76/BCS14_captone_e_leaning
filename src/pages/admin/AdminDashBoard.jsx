import React from "react";

const AdminDashboard = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Users Card */}
      <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-bold text-gray-700">Total Users</h2>
        <p className="text-4xl font-semibold text-blue-600 mt-4">1,245</p>
      </div>

      {/* Total Courses Card */}
      <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-bold text-gray-700">Total Courses</h2>
        <p className="text-4xl font-semibold text-green-600 mt-4">532</p>
      </div>

      {/* Pending Approvals Card */}
      <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-bold text-gray-700">Pending Approvals</h2>
        <p className="text-4xl font-semibold text-yellow-600 mt-4">67</p>
      </div>

      {/* Latest Users Section */}
      <div className="bg-white p-6 rounded shadow col-span-2 md:col-span-1 lg:col-span-2">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Latest Users</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <span className="font-medium">John Doe</span>
            <span className="text-gray-500 text-sm">Registered: 2 hours ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="font-medium">Jane Smith</span>
            <span className="text-gray-500 text-sm">Registered: 1 day ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="font-medium">Alice Johnson</span>
            <span className="text-gray-500 text-sm">Registered: 3 days ago</span>
          </li>
        </ul>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          <li>
            <p className="text-gray-700">John Doe enrolled in "React Basics".</p>
            <span className="text-gray-500 text-sm">5 minutes ago</span>
          </li>
          <li>
            <p className="text-gray-700">Jane Smith completed "Node.js Masterclass".</p>
            <span className="text-gray-500 text-sm">1 hour ago</span>
          </li>
          <li>
            <p className="text-gray-700">Alice Johnson created a new course.</p>
            <span className="text-gray-500 text-sm">2 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
