import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCourseCatalog } from "../../../../util/API/Product/ProductAPI";
import CustomsIsPending from "../../../../util/customs/CustomsIsPending";
import { NavLink, useNavigate } from "react-router-dom";
import Animation from "../../../../util/customs/Animation";

const TrainingCatalog = () => {
  const navigate = useNavigate();
  const imageMap = {
    BackEnd: "./public/back_end.jpeg",
    Design: "./public/design.jpeg",
    DiDong: "./public/mobile.png",
    FrontEnd: "./public/front_end.jpeg",
    FullStack: "./public/fullstack.jpeg",
    TuDuy: "./public/thinking.jpeg",
  };
  const { data, error, isPending } = useQuery({
    queryKey: ["getCourseCatalog"],
    queryFn: getCourseCatalog,
    staleTime: 5 * 60 * 1000,
    cacheTime: 6 * 60 * 1000,
  });
  if (isPending) {
    return <CustomsIsPending />;
  } else if (error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }
  console.log(data);

  return (
    <section className="container my-10 px-5">
      <Animation
        animation={{ x: 0, opacity: 1 }}
        initial={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.8 }}
        delay={0.5}
      >
        <h2 className="mb-5 md:mb-10">
          TRAINING PROGRAMS <span> AT CYBERSOFT</span>{" "}
        </h2>
      </Animation>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item, index) => (
          <Animation
            animation={{ rotate: 0, opacity: 1 }}
            initial={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.8 }}
            delay={1}
            key={item.maDanhMuc}
            index={index}
          >
            <div
              onClick={() =>
                navigate(`/course-catalog?category=${item.maDanhMuc}`)
              }
              className="p-4 border border-gray-300 rounded-lg shadow-md text-center"
            >
              <img
                src={imageMap[item.maDanhMuc] || "./public/default.jpeg"}
                alt={item.tenDanhMuc}
                className="w-full h-40 lg:h-50 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold">{item.tenDanhMuc}</h3>
            </div>
          </Animation>
        ))}
      </div>
    </section>
  );
};

export default TrainingCatalog;
