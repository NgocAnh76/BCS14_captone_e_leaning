import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../api/config";
import Alert from "../components/Alert";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between login and register
  const [alert, setAlert] = useState({ type: "", message: "", show: false });
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    hoTen: "",
    soDt: "",
    maNhom: "GP01",
  });

  const navigate = useNavigate(); // Navigation hook

  // Show alert
  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await apiInstance.post("/QuanLyNguoiDung/DangNhap", {
        taiKhoan: formData.taiKhoan,
        matKhau: formData.matKhau,
      });

      // Save token to localStorage
      localStorage.setItem("accessToken", response.data.accessToken);

      showAlert("success", "Login successful!");

      // Redirect to Admin Dashboard
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      showAlert("error", error.response?.data?.message || "Login failed.");
    }
  };

  // Handle Register
  const handleRegister = async () => {
    try {
      await apiInstance.post("/QuanLyNguoiDung/DangKy", {
        ...formData,
      });
      showAlert("success", "Registration successful! You can now log in.");
      setIsLoginMode(true); // Switch to login mode

      // Redirect to Login Page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      showAlert(
        "error",
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        {alert.show && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ ...alert, show: false })}
          />
        )}
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLoginMode ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="taiKhoan"
            value={formData.taiKhoan}
            onChange={handleInputChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="matKhau"
            value={formData.matKhau}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          {!isLoginMode && (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="hoTen"
                value={formData.hoTen}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="soDt"
                value={formData.soDt}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLoginMode ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLoginMode(false)}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLoginMode(true)}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
