import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashBoard";
import CourseEnrollmentManagement from "./pages/admin/CourseEnrollmentManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import UserEnrollmentManagement from "./pages/admin/UserEnrollmentManagement";
import UserManagement from "./pages/admin/UserManangement";
import AdminTemplates from "./templates/AdminTemplates.jsx";
// Public Pages
import Login from "./pages/account/Login";
import FromProfile from "./pages/account/profile/FromProfile";
import Profile from "./pages/account/profile/Profile";
import Signup from "./pages/account/Signup";
import Contact from "./pages/contact/contact";
import Course from "./pages/courses/Course";
import CourseCatalog from "./pages/courses/CourseCatalog";
import Detail from "./pages/detail/Detail";
import HomePage from "./pages/Home/HomePage";
import HomeMaster from "./pages/pageMaster/HomeMaster";
import UserMaster from "./pages/pageMaster/UserMaster";

// Shared Components
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./main.js";
import "./sass/main.scss";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/login"
            element={<Auth setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Auth isRegister />} />

          {/* Public Routes */}
          <Route path="/" element={<HomeMaster />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="course" element={<Course />} />
            <Route path="course-catalog" element={<CourseCatalog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="detail/:productID" element={<Detail />} />
          </Route>

          {/* User Routes */}
          <Route path="users">
            <Route path="" element={<UserMaster />}>
              <Route index path="login" element={<Login />} />
              <Route path="sign-up" element={<Signup />}></Route>
            </Route>
            <Route path="profile" element={<Profile />}>
              <Route path="" element={<FromProfile />} />
              {/* <Route path="/your-profile" element={<YourProfile />} /> */}
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminTemplates />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="course-management" element={<CourseManagement />} />
            <Route
              path="user-enrollments/:userId"
              element={<UserEnrollmentManagement />}
            />
            <Route
              path="course-enrollments/:courseId"
              element={<CourseEnrollmentManagement />}
            />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
