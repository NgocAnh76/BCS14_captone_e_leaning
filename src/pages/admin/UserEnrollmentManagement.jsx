import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";

const UserEnrollmentManagement = () => {
  const { userId } = useParams(); // User ID passed as a parameter
  const [notEnrolledCourses, setNotEnrolledCourses] = useState([]);
  const [pendingApprovalCourses, setPendingApprovalCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("approved"); // Default tab
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserEnrollments(userId);
  }, [userId]);

  const loadUserEnrollments = async (userId) => {
    try {
      setIsLoading(true);
      const notEnrolled = await api.getCoursesNotEnrolled(userId);
      const pendingApproval = await api.getCoursesPendingApproval(userId);
      const approved = await api.getCoursesApproved(userId);

      setNotEnrolledCourses(notEnrolled.data);
      setPendingApprovalCourses(pendingApproval.data);
      setApprovedCourses(approved.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user enrollments:", error);
      setError("Failed to load enrollments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (courseId, userId) => {
    const data = {
      maKhoaHoc: courseId,
      taiKhoan: userId,
    };

    try {
      await api.enroll(data);
      alert("Enrollment successful!");
      loadUserEnrollments(userId);
    } catch (error) {
      console.error("Error enrolling user:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to enroll user in the course.");
    }
  };

  const handleUnenroll = async (courseId, userId) => {
    const data = {
      maKhoaHoc: courseId,
      taiKhoan: userId,
    };

    try {
      setIsLoading(true);
      await api.unenroll(data);
      alert("Unenrollment successful!");
      loadUserEnrollments(userId);
    } catch (error) {
      console.error("Error unenrolling user:", error.response?.data || error.message);
      alert("Failed to unenroll the user from the course.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCourseTable = (courses, actionButton) => {
    if (courses.length === 0) {
      return <p className="text-center text-gray-500">No courses available in this category.</p>;
    }

    return (
      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border border-gray-300 text-sm font-medium text-gray-600">
                Course Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-300 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.maKhoaHoc}>
                <td className="px-4 py-2 border border-gray-300 text-gray-700">{course.tenKhoaHoc}</td>
                <td className="px-4 py-2 border border-gray-300 text-gray-700">
                  {actionButton(course)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "notEnrolled":
        return renderCourseTable(notEnrolledCourses, (course) => (
          <button
            onClick={() => handleEnroll(course.maKhoaHoc, userId)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Enroll
          </button>
        ));
      case "pendingApproval":
        return renderCourseTable(pendingApprovalCourses, (course) => (
          <button
            onClick={() => handleUnenroll(course.maKhoaHoc, userId)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Unenroll
          </button>
        ));
      case "approved":
      default:
        return renderCourseTable(approvedCourses, (course) => (
          <button
            onClick={() => handleUnenroll(course.maKhoaHoc, userId)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Unenroll
          </button>
        ));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl text-center font-bold mb-6">User Enrollment Management</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
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
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"
          }`}
        >
          Approved
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow">{renderTabContent()}</div>
    </div>
  );
};

export default UserEnrollmentManagement;
