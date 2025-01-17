import React, { useState } from "react";
import { FaArrowLeft, FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { localService } from "../../api/localService";
import { loginApi } from "../../util/API/User/UserApi";
import { showSuccessToast } from "../../util/customs/CustomAlert";
import { loginValidationSchema } from "../../util/schemaValidation/SchemaVatidation";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const mutation = useMutation({
    mutationKey: ["loginApi"],
    mutationFn: loginApi,
    onSuccess: (data) => {
      showSuccessToast(`Login Success`);
      localService.setAccessToken(data.accessToken);
      localService.setUser(data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });

  return (
    <div>
      <div className="w-[35vw] signup_right">
        <h1 className="signup_heading">Sign In</h1>
        <h2 className="signup_caption">Sign in with</h2>
        <div className="signup-social">
          <div className="signup-social_item">
            <i className="fa-brands fa-google signup-social_icon"></i>
            <span className="sign-social_text">Sign in with Google</span>
          </div>
          <div className="signup-social_item">
            <i className="fa-brands fa-facebook-f signup-social_icon"></i>
            <span className="sign-social_text">Sign in with Facebook</span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
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

          {/* Nút Đăng nhập & Điều hướng */}
          <div className="flex justify-between items-center mt-5 text-white">
            <button
              type="submit"
              className="px-8 py-4 rounded-3xl bg-blue-700"
              style={{ padding: "15px 40px" }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Logging in..." : "Login"}
            </button>
            <NavLink
              className="text-lg text-blue-500 flex items-center"
              to="/users/sign-up"
            >
              <FaArrowLeft />
              Back to register
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
