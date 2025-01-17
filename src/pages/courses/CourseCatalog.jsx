import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  BE,
  DESIGN,
  FE,
  FULL_STACK,
  MOBILE,
  THINKING,
} from "../../util/API/constants/Constants";
import { getCourse } from "../../util/API/Product/ProductAPI";
import CustomsIsPending from "../../util/customs/CustomsIsPending";
import CarCourse from "../../util/productCommon/CarCourse";
import { useSearchParams } from "react-router-dom";

const listCourse = [
  { title: "FrontEnd", value: FE },
  { title: "BackEnd", value: BE },
  { title: "FullStack", value: FULL_STACK },
  { title: "Design", value: DESIGN },
  { title: "Thinking", value: THINKING },
  { title: "Mobile", value: MOBILE },
];

const CourseCatalog = () => {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || listCourse[0].value
  );
  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL]);
  const { data, error, isPending } = useQuery({
    queryKey: ["getCourses", selectedCategory],
    queryFn: () => getCourse(selectedCategory),
    staleTime: 5 * 60 * 1000,
    cacheTime: 6 * 60 * 1000,
  });
  return (
    <main className="container mx-auto p-4">
      <div className="flex gap-4 justify-center mb-8 pt-28">
        {listCourse.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelectedCategory(item.value)}
            className={twMerge([
              "px-4 py-2 border rounded-lg text-sm md:text-base font-medium",
              selectedCategory === item.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black",
            ])}
          >
            {item.title}
          </button>
        ))}
      </div>
      {isPending && <CustomsIsPending />}
      {error && (
        <div className="text-red-500 text-center">
          {error.message || "Failed to load courses"}
        </div>
      )}
      {!isPending && !error && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((course) => {
            return <CarCourse course={course} />;
          })}
        </section>
      )}
    </main>
  );
};

export default CourseCatalog;
