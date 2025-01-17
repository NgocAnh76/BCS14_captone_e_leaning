import { apiInstance } from "./config";

export const api = {
    // Login
    login: (credentials) => apiInstance.post("/QuanLyNguoiDung/DangNhap", credentials),

    // User Management
    getUserList: () => apiInstance.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"),
    addUser: (userData) => apiInstance.post("/QuanLyNguoiDung/ThemNguoiDung", userData),
    updateUser: (userData) => apiInstance.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData),
    deleteUser: (taiKhoan) => apiInstance.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`),

    // Course Management
    getCourseList: () => apiInstance.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"),
    getCourseDetails: (courseId) => apiInstance.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`),
    addCourse: (courseData) => apiInstance.post("/QuanLyKhoaHoc/ThemKhoaHoc", courseData),
    updateCourse: (courseId, courseData) => apiInstance.put(`/QuanLyKhoaHoc/CapNhatKhoaHoc?maKhoaHoc=${courseId}`, courseData),
    deleteCourse: (courseId) => apiInstance.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${courseId}`),

    // Enrollment Management
    getCoursesNotEnrolled: (userId) =>
        apiInstance.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", { taiKhoan: userId }),

    getCoursesPendingApproval: (userId) =>
        apiInstance.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", { taiKhoan: userId }),

    getCoursesApproved: (userId) =>
        apiInstance.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", { taiKhoan: userId }),

    getStudentsPendingApproval: (courseId) =>
        apiInstance.post("/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", { maKhoaHoc: courseId }),

    // Get Enrolled Users
    getStudentsInCourse: (courseId) => {
        return apiInstance.post("/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", { maKhoaHoc: courseId });
    },

    // Get Unenrolled Users
    getUsersNotEnrolled: (courseId) => {
        return apiInstance.post("/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", { maKhoaHoc: courseId });
    },

    // Enroll User
    enroll: (data) => {
        return apiInstance.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
    },

    // Unenroll User
    unenroll: (data) => {
        return apiInstance.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
    },

};