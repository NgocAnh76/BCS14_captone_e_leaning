// validationSchema.js
import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Invalid account, please re-enter")
    .required("Required account cannot be blank"),
  matKhau: Yup.string()
    .matches(/^.{6,12}$/, "Password must be between 6 and 12 characters")
    .required("Required password cannot be blank"),
  hoTen: Yup.string()
    .matches(
      /^[a-zA-ZÀ-ỹ\s]+$/,
      "Full name can only contain letters and spaces"
    )
    .required("Required fullname cannot be blank"),
  soDT: Yup.string()
    .matches(/^\d{10,11}$/, "Phone number must be 10 to 11 digits")
    .required("Required phone cannot be blank"),
  maNhom: Yup.string().required("Group code cannot be blank"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Required email cannot be blank"),
});

export const loginValidationSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Invalid account, please re-enter")
    .required("Required account cannot be blank"),
  matKhau: Yup.string()
    .matches(/^.{6,12}$/, "Password must be between 6 and 12 characters")
    .required("Required password cannot be blank"),
});
