import { localService } from "../../../api/localService";
import { DOMAIN, http } from "../../Setting/Setting";
import { GROUP_CODE } from "../constants/Constants";

export const getCourseList = async () => {
  const res = await http.get(
    `${DOMAIN}/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUP_CODE}`
  );
  return res.data;
};

export const getCourseCatalog = async () => {
  const res = await http.get(`${DOMAIN}/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
  return res.data;
};
export const getMobileCourse = async (maDanhMuc, MaNhom = GP01) => {
  const res = await http.get(
    `${DOMAIN}/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc`,
    {
      params: {
        maDanhMuc,
        MaNhom,
      },
    }
  );
  console.log(res);
  return res.data;
};
export const getCourse = async (maDanhMuc, MaNhom = GROUP_CODE) => {
  const res = await http.get(
    `${DOMAIN}/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc`,
    {
      params: {
        maDanhMuc,
        MaNhom,
      },
    }
  );
  return res.data;
};

export const getDetailCourse = async (maKhoaHoc) => {
  const res = await http.get(`${DOMAIN}/api/QuanLyKhoaHoc/LayThongTinKhoaHoc`, {
    params: {
      maKhoaHoc: maKhoaHoc,
    },
  });
  return res.data;
};
export const registerCourse = async (values) => {
  const res = await http.post(
    `${DOMAIN}/api/QuanLyKhoaHoc/DangKyKhoaHoc`,
    values,
    {
      headers: {
        Authorization: `Bearer ${localService.getAccessToken()}`,
      },
    }
  );
  return res.data;
};
export const cancelCourse = async (values) => {
  const res = await http.post(
    `${DOMAIN}/api/QuanLyKhoaHoc/HuyGhiDanh`,
    values,
    {
      headers: {
        Authorization: `Bearer ${localService.getAccessToken()}`,
      },
    }
  );
  return res.data;
};
