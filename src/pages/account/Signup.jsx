import React, { useState } from "react";
import { FaArrowLeft, FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

import { registerApi } from "../../util/API/User/UserApi";
import {
  showErrorToast,
  showSuccessToast,
} from "../../util/customs/CustomAlert";
import { signupValidationSchema } from "../../util/schemaValidation/SchemaVatidation";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const mutation = useMutation({
    mutationKey: ["registerApi"],
    mutationFn: registerApi,
    onSuccess: (data) => {
      showSuccessToast("Registration successful");
      navigate("/users/login");
    },
    onError: (error) => {
      showErrorToast(error.response?.data || "Registration failed");
    },
  });
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });

  return (
    <div className="w-[40vw] signup_right">
      <h1 className="signup_heading">Sign Up</h1>
      <h2 className="signup_caption">Sign up with</h2>
      <div className="signup-social">
        <div className="signup-social_item">
          <i className="fa-brands fa-google signup-social_icon"></i>
          <span className="sign-social_text">Sign up with Google</span>
        </div>
        <div className="signup-social_item">
          <i className="fa-brands fa-facebook-f signup-social_icon"></i>
          <span className="sign-social_text">Sign up with Facebook</span>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Account */}
        <div className="form-group">
          <label htmlFor="taiKhoan">Account</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.taiKhoan && formik.errors.taiKhoan
                ? "border-red-500"
                : ""
            }`}
            id="taiKhoan"
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <p className="text-red-500">{formik.errors.taiKhoan}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="matKhau">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${
                formik.touched.matKhau && formik.errors.matKhau
                  ? "border-red-500"
                  : ""
              }`}
              id="matKhau"
              name="matKhau"
              value={formik.values.matKhau}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          {formik.touched.matKhau && formik.errors.matKhau && (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="hoTen">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="hoTen"
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hoTen && formik.errors.hoTen && (
            <p className="text-red-500">{formik.errors.hoTen}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="soDT">Phone</label>
          <input
            type="text"
            className="form-control"
            id="soDT"
            name="soDT"
            value={formik.values.soDT}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maNhom">Group Code</label>
          <input
            type="text"
            className="form-control"
            id="maNhom"
            name="maNhom"
            value={formik.values.maNhom}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex justify-between mt-5 text-white">
          <button type="submit" className="px-8 py-4 rounded-3xl bg-blue-700">
            {mutation.isLoading ? "Registering..." : "Register"}
          </button>
          <NavLink to="/" className="text-blue-500 flex items-center">
            <FaArrowLeft />
            Back to home
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
