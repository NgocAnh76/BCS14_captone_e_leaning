import React from "react";
import Banner from "./HomeLayout/Banner";
import Advice from "./HomeLayout/discover/Advice";
import Benefit from "./HomeLayout/propose/Benefit";
import Curriculum from "./HomeLayout/propose/Curriculum";
import Evaluate from "./HomeLayout/propose/Evaluate";
import TheReasons from "./HomeLayout/propose/TheReasons";
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
