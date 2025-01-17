import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";

const CourseEnrollmentManagement = () => {
  const { courseId } = useParams();
  const [notEnrolledUsers, setNotEnrolledUsers] = useState([]);
  const [pendingApprovalUsers, setPendingApprovalUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("approved"); // Default to Approved Users
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourseEnrollments(courseId);
  }, [courseId]);

  const loadCourseEnrollments = async (courseId) => {
    try {
      setIsLoading(true);
      const notEnrolled = await api.getUsersNotEnrolled(courseId);
      const pendingApproval = await api.getStudentsPendingApproval(courseId);
      const approved = await api.getStudentsInCourse(courseId);

      setNotEnrolledUsers(notEnrolled.data);
      setPendingApprovalUsers(pendingApproval.data);
      setApprovedUsers(approved.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching course enrollments:", error);
      setError("Failed to load enrollments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (userId) => {
    const data = { maKhoaHoc: courseId, taiKhoan: userId };
    try {
      await api.enroll(data);
      alert("Enrollment successful!");
      loadCourseEnrollments(courseId);
    } catch (error) {
      console.error("Error enrolling user:", error.response?.data || error.message);
      alert("Failed to enroll the user.");
    }
  };

  const handleUnenroll = async (userId) => {
    const data = { maKhoaHoc: courseId, taiKhoan: userId };
    try {
      await api.unenroll(data);
      alert("Unenrollment successful!");
      loadCourseEnrollments(courseId);
    } catch (error) {
      console.error("Error unenrolling user:", error.response?.data || error.message);
      alert("Failed to unenroll the user.");
    }
  };

  const renderUserTable = (users, actionButton) => {
    if (users.length === 0) {
      return <p className="text-center text-gray-500">No users in this category.</p>;
    }

    return (
      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                Full Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                Account
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.taiKhoan}>
                <td className="px-4 py-2 border border-gray-300">{user.hoTen}</td>
                <td className="px-4 py-2 border border-gray-300">{user.taiKhoan}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {actionButton(user)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "notEnrolled":
        return renderUserTable(notEnrolledUsers, (user) => (
          <button
            onClick={() => handleEnroll(user.taiKhoan)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Enroll
          </button>
        ));
      case "pendingApproval":
        return renderUserTable(pendingApprovalUsers, (user) => (
          <button
            onClick={() => handleUnenroll(user.taiKhoan)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Unenroll
          </button>
        ));
      case "approved":
      default:
        return renderUserTable(approvedUsers, (user) => (
          <button
            onClick={() => handleUnenroll(user.taiKhoan)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Unenroll
          </button>
        ));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl text-center font-bold mb-6">Course Enrollment Management</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("notEnrolled")}
          className={`px-4 py-2 rounded ${
            activeTab === "notEnrolled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Not Enrolled
        </button>
        <button
          onClick={() => setActiveTab("pendingApproval")}
          className={`px-4 py-2 rounded ${
            activeTab === "pendingApproval"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white"
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 rounded ${
            activeTab === "approved"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white"
          }`}
        >
          Approved
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white p-4 rounded shadow">{renderActiveTab()}</div>
    </div>
  );
};

export default CourseEnrollmentManagement;
