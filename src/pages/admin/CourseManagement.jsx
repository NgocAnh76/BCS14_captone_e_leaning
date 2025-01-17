import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseData, setCourseData] = useState({
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    ngayTao: "",
    luotXem: 0,
    danhMucKhoaHoc: { maDanhMucKhoahoc: "default", tenDanhMucKhoaHoc: "" },
    maNhom: "GP01",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "", show: false });

  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await api.getCourseList();
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      showAlert("error", "Failed to fetch courses. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = courses.filter(
      (course) =>
        course.maKhoaHoc.toLowerCase().includes(value.toLowerCase()) ||
        course.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const openModal = (course = null) => {
    if (course) {
      setCourseData(course);
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

  const handleAddOrUpdateCourse = async () => {
    if (!courseData.maKhoaHoc || !courseData.tenKhoaHoc || !courseData.moTa) {
      showAlert("warning", "Please fill out all required fields.");
      return;
    }

    if (
      !isEditing &&
      courses.some((course) => course.maKhoaHoc === courseData.maKhoaHoc)
    ) {
      showAlert("warning", "Course ID already exists. Please use a unique ID.");
      return;
    }

    try {
      if (isEditing) {
        await api.updateCourse(courseData.maKhoaHoc, courseData);
        showAlert("success", "Course updated successfully!");
      } else {
        await api.addCourse(courseData);
        showAlert("success", "Course added successfully!");
      }
      closeModal();
      loadCourses();
    } catch (error) {
      console.error(
        "Error saving course:",
        error.response?.data || error.message
      );
      showAlert("error", "Failed to save course. Please try again.");
    }
  };

  const handleDeleteCourse = async (maKhoaHoc) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.deleteCourse(maKhoaHoc);
        showAlert("success", "Course deleted successfully!");
        loadCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
        showAlert("error", "Failed to delete course. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setCourseData({
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      ngayTao: "",
      luotXem: 0,
      danhMucKhoaHoc: { maDanhMucKhoahoc: "default", tenDanhMucKhoaHoc: "" },
      maNhom: "GP01",
    });
  };

  return (
    <div className="container mx-auto px-4">
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="flex flex-col">
        <main className="w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Course Management
          </h2>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by ID or Name"
            className="mb-4 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={() => openModal()}
            className="mb-4 px-6 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded shadow"
          >
            Add Course
          </button>

          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Course List
            </h3>
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <table className="table-fixed w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-4 py-2 text-start font-medium text-gray-600">
                      ID
                    </th>
                    <th className="px-4 py-2 text-start font-medium text-gray-600">
                      Name
                    </th>
                    <th className="px-4 py-2 text-start font-medium text-gray-600">
                      Description
                    </th>
                    <th className="px-4 py-2 text-start font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr
                      key={course.maKhoaHoc}
                      className="border-b border-gray-300"
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {course.maKhoaHoc}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {course.tenKhoaHoc}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {course.moTa}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 flex space-x-2">
                        <button
                          onClick={() => openModal(course)}
                          className="px-2 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded shadow"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.maKhoaHoc)}
                          className="px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/course-enrollments/${course.maKhoaHoc}`
                            )
                          }
                          className="px-2 py-1 bg-orange-500 text-white rounded shadow hover:bg-orange-600"
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
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Course" : "Add Course"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="maKhoaHoc"
                value={courseData.maKhoaHoc}
                onChange={handleInputChange}
                placeholder="Course ID"
                className="border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="tenKhoaHoc"
                value={courseData.tenKhoaHoc}
                onChange={handleInputChange}
                placeholder="Course Name"
                className="border px-4 py-2 rounded"
              />
              <textarea
                name="moTa"
                value={courseData.moTa}
                onChange={handleInputChange}
                placeholder="Description"
                className="border px-4 py-2 rounded"
              />
              <input
                type="date"
                name="ngayTao"
                value={courseData.ngayTao}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleAddOrUpdateCourse}
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

export default CourseManagement;
