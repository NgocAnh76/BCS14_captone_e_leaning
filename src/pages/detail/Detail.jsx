import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CustomsIsPending from "../../util/customs/CustomsIsPending";
import {
  showErrorToast,
  showSuccessToast,
} from "../../util/customs/CustomAlert";
import {
  getDetailCourse,
  registerCourse,
} from "../../util/API/Product/ProductAPI";
import { FaArrowLeftLong } from "react-icons/fa6";
import FallbackImage from "../Home/HomeLayout/CourseList/FallbackImage";
import Avatar from "../../util/customs/CustomAvatar";
import { CiShare2 } from "react-icons/ci";
import { localService } from "../../api/localService";
const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.productID;
  const user = localService.getUser();
  const { data, error, isPending } = useQuery({
    queryKey: ["getDetailCourse", id],
    queryFn: () => getDetailCourse(id),
    enabled: !!id,
  });
  const mutation = useMutation({
    mutationFn: (values) => registerCourse(values),
    onSuccess: () => {
      showSuccessToast("Course register successfully!");
    },
    onError: (err) => {
      showErrorToast({ error: err.message });
    },
  });
  const handleRegisterCourse = () => {
    console.log({ maKhoaHoc: id, taiKhoan: user?.taiKhoan });
    mutation.mutate({ maKhoaHoc: id, taiKhoan: user?.taiKhoan });
  };

  if (isPending) {
    return <CustomsIsPending />;
  }
  if (error) {
    console.log(error);
    return showErrorToast({ error });
  }

  const button = document.querySelector("button");
  const footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  });

  return (
    <>
      <section className="py-16 md:20">
        <div className="bg-detail-course bg-cover bg-center">
          <div className="container">
            <div className="pt-5 md:pt-10 lg:py-20">
              <NavLink
                to="/course-catalog"
                className="flex items-center text-textDark text-sm md:text-base lg:text-2xl"
              >
                <FaArrowLeftLong className="text-primary mr-1" />
                Back to learning path
              </NavLink>
              <div className="lg:flex justify-between">
                <div className="p-5 lg:w-[70%]">
                  <h2 className="text-3xl md:text-5xl lg:text-8xl  mt-5 md:mt-8 font-semibold">
                    {data.tenKhoaHoc}
                  </h2>
                  <p className="text-xs md:text-xl lg:text-2xl font-thin my-5 lg:my-8">
                    {data.moTa}
                  </p>
                  <div className="flex items-center gap-1 md:gap-3">
                    <Avatar name={data.nguoiTao?.hoTen} />
                    <h3 className="text-sm md:text-xl lg:text-3xl font-medium capitalize ">
                      {data.nguoiTao?.hoTen}
                    </h3>
                  </div>
                </div>
                <div className="bg-white py-[2px] w-[90%] lg:w-[30%] lg:py-5 h-full rounded-2xl mx-auto">
                  <div className="w-[95%] mx-auto mt-5 md:mt-10 rounded-xl">
                    <div className="w-full lg:w-[90%] mx-auto">
                      <FallbackImage
                        src={data.hinhAnh}
                        className="w-full h-[25vh] lg:h-[15vh] bg-cover rounded-3xl "
                        alt={data.tenKhoaHoc}
                      />
                    </div>
                    <div className="px-5 mt-3 text-xs lg:text-2xl font-light">
                      <p>
                        View:{" "}
                        <span className="text-textDark">{data.luotXem}</span>
                      </p>
                      <p>
                        Number of students:
                        <span className="text-textDark">
                          {data.soLuongHocVien}
                        </span>
                      </p>
                      <div className="border-t-[1px] border-primary mt-5 relative w-full left-0 lg:border-none">
                        <div className=" mx-auto flex items-center justify-between gap-3 mt-2">
                          <button
                            onClick={handleRegisterCourse}
                            className="mx-auto w-full py-3 lg:py-5 text-xl bg-primary rounded-full cursor-pointer font-medium"
                          >
                            Buy now
                          </button>
                          <button className="p-3 lg:p-5 text-xl border-[1px] rounded-full">
                            <CiShare2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Detail;

// const getFallbackSrc = (maDanhMucKhoahoc) => {
//   console.log(maDanhMucKhoahoc);
//   if (maDanhMucKhoahoc?.toLowerCase().includes("FrontEnd"))
//     return "/front_end.jpeg";
//   if (maDanhMucKhoahoc?.toLowerCase().includes("BackEnd"))
//     return "/back_end.jpeg";
//   if (maDanhMucKhoahoc?.toLowerCase().includes("Design"))
//     return "/design.jpeg";
//   if (maDanhMucKhoahoc?.toLowerCase().includes("FullStack"))
//     return "/fullstack.jpeg";
//   if (maDanhMucKhoahoc?.toLowerCase().includes("DiDong"))
//     return "/mobile.png";
//   if (maDanhMucKhoahoc?.toLowerCase().includes("TuDuy"))
//     return "/thinking.jpeg";
// };
