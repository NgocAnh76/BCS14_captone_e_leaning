import React from "react";
import FallbackImage from "../../pages/Home/HomeLayout/CourseList/FallbackImage";
import { NavLink } from "react-router-dom";

const CarCourse = (props) => {
  const { course } = props;
  return (
    <div key={course.maKhoaHoc} className="p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <FallbackImage
          src={course.hinhAnh ? course.hinhAnh : "./public/fontend_image.jpeg"}
          alt={course.tenKhoaHoc}
          className="w-full h-48 object-cover"
        />
        <NavLink to={`/detail/${course.maKhoaHoc}`} className="p-4 block">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {course.tenKhoaHoc}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            <strong>View:</strong> {course.luotXem}
          </p>
          <p className="text-sm text-gray-600">
            {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default CarCourse;
