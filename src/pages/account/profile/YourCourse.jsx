import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaRegEye, FaRegTrashCan } from "react-icons/fa6";
import { localService } from "../../../api/localService";
import {
  cancelCourse,
  getDetailCourse,
} from "../../../util/API/Product/ProductAPI";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../util/customs/CustomAlert";
import CustomsIsPending from "../../../util/customs/CustomsIsPending";
import { NavLink } from "react-router-dom";

const YourCourse = (props) => {
  const { chiTietKhoaHocGhiDanh } = props.data;
  const queryClient = useQueryClient();

  const codeCourseList = chiTietKhoaHocGhiDanh?.map((item) => item.maKhoaHoc);

  const courseQueries = useQueries({
    queries: codeCourseList.map((maKhoaHoc) => ({
      queryKey: ["getDetailCourse", maKhoaHoc],
      queryFn: () => getDetailCourse(maKhoaHoc),
      enabled: !!maKhoaHoc,
    })),
  });

  const mutation = useMutation({
    mutationFn: (values) => cancelCourse(values),
    onSuccess: () => {
      showSuccessToast("Course cancel successfully!");
      queryClient.invalidateQueries({ queryKey: ["getDetailCourse"] }); // Làm mới dữ liệu
    },
    onError: (err) => {
      showErrorToast({ error: err.message });
    },
  });

  const isPending = courseQueries.some((query) => query.isPending);
  const hasError = courseQueries.some((query) => query.error);

  if (isPending) {
    return <CustomsIsPending />;
  }

  if (hasError) {
    const error = courseQueries.find((query) => query.error)?.error;
    console.log(error);
    return showErrorToast({ error });
  }
  const user = localService.getUser();
  const handleCancelCourse = (maKhoaHoc) => {
    mutation.mutate({
      maKhoaHoc,
      taiKhoan: user?.taiKhoan,
    });
  };

  return (
    <div className="mt-10">
      <h2>
        Your <span>Courses</span>
      </h2>
      <table width="100%">
        <thead>
          <tr className="text-sm">
            <th className={styles.th}>#</th>
            <th className={styles.th}>Course Name</th>
            <th className={styles.th}>Course ID</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseQueries.map((result, index) => (
            <tr key={codeCourseList[index]} className={styles.tr}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{result.data?.tenKhoaHoc || "N/A"}</td>
              <td className={styles.td}>{result.data?.maKhoaHoc || "N/A"}</td>
              <td className="text-sm md:text-base lg:text-lg flex justify-center items-center border-b-2 py-2">
                <NavLink
                  to={`/detail/${result.data?.maKhoaHoc}`}
                  className={styles.button}
                >
                  <FaRegEye />
                </NavLink>
                <button
                  className={styles.buttonDelete}
                  onClick={() => handleCancelCourse(result.data?.maKhoaHoc)}
                >
                  <FaRegTrashCan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: "bg-gray-100 p-2 border border-gray-300 text-left text-sm md:text-base lg:text-lg",
  td: "p-2 border border-gray-300 text-xs md:text-sm lg:text-base",
  tr: "odd:bg-white even:bg-gray-100",
  button:
    "px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600",
  buttonDelete:
    "ml-2 px-3 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700",
};

export default YourCourse;
