import { useFormik } from "formik";
import React, { useState } from "react";
import { signupValidationSchema } from "../../../util/schemaValidation/SchemaVatidation";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../util/API/User/UserApi";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../util/customs/CustomAlert";
const YourProfile = (props) => {
  const { data } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const mutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      showSuccessToast("Update successful");
    },
    onError: (error) => {
      showErrorToast(error.response?.data || "Update failed");
    },
  });
  const formik = useFormik({
    initialValues: {
      taiKhoan: data?.taiKhoan || "",
      matKhau: data?.matKhau || "",
      hoTen: data?.hoTen || "",
      soDT: data?.soDT || "",
      maLoaiNguoiDung: "HV",
      maNhom: data?.maNhom || "GP01",
      email: data?.email || "",
    },
    enableReinitialize: true,
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    },
  });
  const fromProfile = [
    { title: "Account", type: "text", name: "taiKhoan", id: "taiKhoan" },
    { title: "Password", type: "password", name: "matKhau", id: "matKhau" },
    { title: "Phone", type: "text", name: "soDT", id: "soDT" },
    { title: "Full name", type: "text", name: "hoTen", id: "hoTen" },
    { title: "Email", type: "text", name: "email", id: "email" },
  ];
  return (
    <div className="card md:p-5 w-full ">
      <div className="px-5 mt-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-secondary font-semibold">
              Your <span>profile</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg font-thin md:mt-2 ">
              This will be shared with other students
            </p>
            <p className="text-sm md:text-base lg:text-lg font-thin md:mb-5">
              And you can edit your profile here
            </p>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <ul className="lg:flex w-full lg:flex-wrap">
            {fromProfile?.map((item) => (
              <li className="lg:w-1/2 pr-3" key={item.id}>
                <div className="form-group">
                  <label
                    htmlFor={item.id}
                    className="block text-sm md:text-base lg:text-lg mb-0 font-semibold text-gray-900"
                  >
                    {item.title}
                  </label>
                  <div className={item.type === "password" ? "relative" : ""}>
                    <input
                      type={
                        item.type === "password" && showPassword
                          ? "text"
                          : item.type
                      }
                      id={item.id}
                      name={item.name}
                      disabled={item.id === "taiKhoan"}
                      value={formik.values[item.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched[item.name] && formik.errors[item.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-sm md:text-base`}
                    />
                    {item.type === "password" && (
                      <div
                        onClick={togglePasswordVisibility}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </div>
                    )}
                  </div>
                  {formik.touched[item.name] && formik.errors[item.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors[item.name]}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="py-3 px-10 mt-10 bg-blue-500 text-white"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Updating..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default YourProfile;
