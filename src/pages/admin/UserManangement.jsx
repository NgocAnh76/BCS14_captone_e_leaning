import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDt: "",
    matKhau: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "", show: false });

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.getUserList();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showAlert("error", "Failed to fetch users.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredUsers(
      value
        ? users.filter(
            (user) =>
              user.taiKhoan.toLowerCase().includes(value.toLowerCase()) ||
              user.hoTen.toLowerCase().includes(value.toLowerCase()) ||
              user.email.toLowerCase().includes(value.toLowerCase())
          )
        : users
    );
  };

  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const openModal = (user = null) => {
    if (user) {
      setUserData(user);
      setIsEditing(true);
    } else {
      resetForm();
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleAddOrUpdateUser = async () => {
    if (!userData.taiKhoan || !userData.email) {
      showAlert("warning", "Please fill out all required fields.");
      return;
    }

    if (!isEditing) {
      const isDuplicate = users.some(
        (user) =>
          user.taiKhoan.toLowerCase() === userData.taiKhoan.toLowerCase() ||
          user.email.toLowerCase() === userData.email.toLowerCase()
      );
      if (isDuplicate) {
        showAlert("warning", "User with this account or email already exists.");
        return;
      }
    }

    try {
      if (isEditing) {
        await api.updateUser(userData);
        showAlert("success", "User updated successfully!");
      } else {
        await api.addUser({
          ...userData,
          maLoaiNguoiDung: userData.maLoaiNguoiDung || "HV",
        });
        showAlert("success", "User added successfully!");
      }
      closeModal();
      loadUsers();
    } catch (error) {
      console.error("Error saving user:", error.response?.data || error.message);
      showAlert("error", "Failed to save user.");
    }
  };

  const handleDeleteUser = async (taiKhoan) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.deleteUser(taiKhoan);
        showAlert("success", "User deleted successfully!");
        loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        showAlert("error", "Failed to delete user.");
      }
    }
  };

  const resetForm = () => {
    setUserData({
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
    });
  };

  return (
    <div className="container mx-auto px-4">
      {alert.show && <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}

      <h2 className="text-3xl font-bold mb-8 text-center">User Management</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by Account, Name, or Email"
        className="mb-4 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={() => openModal()}
        className="mb-4 px-6 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded shadow"
      >
        Add User
      </button>

      <div className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">User List</h3>
        <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <table className="table-fixed w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100 border-b border-gray-300">
      <th className="px-4 py-2 text-start font-medium text-gray-600">Account</th>
      <th className="px-4 py-2 text-start font-medium text-gray-600">Full Name</th>
      <th className="px-4 py-2 text-start font-medium text-gray-600">Email</th>
      <th className="px-4 py-2 text-start font-medium text-gray-600">Phone</th>
      <th className="px-4 py-2 text-start font-medium text-gray-600">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user) => (
      <tr key={user.taiKhoan} className="border-b border-gray-300">
        <td className="px-2 py-2 text-sm text-gray-700 truncate max-w-[150px]">{user.taiKhoan}</td>
        <td className="px-2 py-2 text-sm text-gray-700 truncate max-w-[150px]">{user.hoTen}</td>
        <td className="px-2 py-2 text-sm text-gray-700 truncate max-w-[200px]">{user.email}</td>
        <td className="px-2 py-2 text-sm text-gray-700 truncate max-w-[100px]">{user.soDt}</td>
        <td className="px-2 py-2 text-sm text-gray-700 flex space-x-2">
          <button
            onClick={() => openModal(user)}
            className="px-2 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded shadow"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => handleDeleteUser(user.taiKhoan)}
            className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded shadow"
          >
            <i className="fas fa-trash"></i>
          </button>
          <button
            onClick={() => navigate(`/admin/user-enrollments/${user.taiKhoan}`)}
            className="px-2 py-1 text-white bg-orange-500 hover:bg-orange-600 rounded shadow"
          >
            <i className="fas fa-users"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="taiKhoan"
                value={userData.taiKhoan}
                onChange={handleInputChange}
                placeholder="Account"
                className="border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                name="hoTen"
                value={userData.hoTen}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="password"
                name="matKhau"
                value={userData.matKhau}
                onChange={handleInputChange}
                placeholder="Password"
                className="border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                name="soDt"
                value={userData.soDt}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border border-gray-300 rounded px-4 py-2"
              />
              <select
                name="maLoaiNguoiDung"
                value={userData.maLoaiNguoiDung}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Select Role</option>
                <option value="HV">Student</option>
                <option value="GV">Instructor</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleAddOrUpdateUser}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
