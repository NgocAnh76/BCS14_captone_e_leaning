import React from "react";
import GetCourse from "../Home/HomeLayout/CourseList/GetCourse";
import {
  BE,
  DESIGN,
  FE,
  FULL_STACK,
  MOBILE,
  THINKING,
} from "../../util/API/constants/Constants";
import { twMerge } from "tailwind-merge";
import CourseCatalog from "./CourseCatalog";

const Course = () => {
  const listCourse = [
    {
      title: "FontEnd",
      value: FE,
    },
    {
      title: "BackEnd",
      value: BE,
    },
    {
      title: "FullStack",
      value: FULL_STACK,
    },
    {
      title: "DeSign",
      value: DESIGN,
    },
    {
      title: "Thinking",
      value: THINKING,
    },
    {
      title: "Mobile",
      value: MOBILE,
    },
  ];
  return (
    <>
      <main className="container">
        {listCourse?.map((item, index) => {
          return (
            <section>
              <h2
                className={twMerge([
                  "pt-12 pl-5 text-xl md:text-4xl lg:text-[2.5rem] xl:text-4xl font-semibold ",
                  index === 0 && "pt-32",
                ])}
              >
                <span className="text-yellow-500 mr-2">{item.title}</span>
                Courses
              </h2>
              <GetCourse course={item.value} />
            </section>
          );
        })}
      </main>
    </>
  );
};

export default Course;
