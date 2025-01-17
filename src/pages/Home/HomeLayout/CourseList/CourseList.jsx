import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getCourseList } from "../../../../util/API/Product/ProductAPI";
import Slider from "react-slick";
import CourseCarousel from "./CourseCarousel";

const CourseList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["getCourseList"],
    queryFn: getCourseList,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
  });

  if (isPending) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }
  return (
    <section className="course_list">
      <h2 className="carouse_title">Course List</h2>
      <CourseCarousel data={data} />
    </section>
  );
};

export default CourseList;
