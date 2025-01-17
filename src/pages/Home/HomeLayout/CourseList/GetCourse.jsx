import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../../../util/API/Product/ProductAPI";
import CourseCarousel from "./CourseCarousel";
import { AiOutlineLoading } from "react-icons/ai";
import CustomsIsPending from "../../../../util/customs/CustomsIsPending";
const GetCourse = ({ course }) => {
  const { data, error, isPending } = useQuery({
    queryKey: [`getCourse-${course}`],
    queryFn: () => getCourse(course),
    staleTime: 5 * 60 * 1000,
    cacheTime: 6 * 60 * 1000,
  });
  if (isPending) {
    return <CustomsIsPending />;
  } else if (error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }
  return (
    <div className="container">
      <CourseCarousel data={data} />
    </div>
  );
};

export default GetCourse;
