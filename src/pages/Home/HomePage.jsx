import React from "react";
import {
  BE,
  DESIGN,
  FE,
  FULL_STACK,
  MOBILE,
  THINKING,
} from "../../util/API/constants/Constants";
import Banner from "./HomeLayout/Banner";
import GetCourse from "./HomeLayout/CourseList/GetCourse";
import Headers from "./HomeLayout/Headers";
import CourseList from "./HomeLayout/CourseList/CourseList";
import { twMerge } from "tailwind-merge";
import Advice from "./HomeLayout/discover/advice";
import Evaluate from "./HomeLayout/propose/Evaluate";
import TheReasons from "./HomeLayout/propose/TheReasons";
import Curriculum from "./HomeLayout/propose/Curriculum";
import Benefit from "./HomeLayout/propose/Benefit";
import TrainingCatalog from "./HomeLayout/propose/TrainingCatalog";
// import CourseList from "./HomeLayout/CourseList/CourseList";

const HomePage = () => {
  return (
    <>
      {/* <Headers /> */}
      <Banner />
      <TheReasons />
      <Benefit />
      <Curriculum />
      <Advice />
      <TrainingCatalog />
      <Evaluate />
    </>
  );
};

export default HomePage;
