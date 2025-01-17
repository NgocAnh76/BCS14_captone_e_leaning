import React from "react";
import { FaCheck } from "react-icons/fa6";
import { GoCheckCircle } from "react-icons/go";
import { IoIosCheckmark } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Animation from "../../../../util/customs/Animation";

const Advice = () => {
  return (
    <section className="container">
      <div className="lg:flex lg:justify-end lg:items-center lg:mt-16">
        <Animation
          animation={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="p-5 mb-14 xl:mb-0 max-w-[700px]">
            Propel your <span className="text-primary">career & expand</span>{" "}
            your knowledge at any level
          </h2>
        </Animation>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-20">
        <Animation
          animation={{ x: 0, opacity: 1 }}
          initial={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="col-span-1 ">
            <div className="relative w-[calc(100vw-40px)] lg:w-[466px] h-[calc((100vw-40px)/1.37)] lg:h-[430px] xl:w-full xl:h-[600px] ">
              <div className="bg-primary opacity-30 w-full h-full absolute [clip-path:polygon(80%_0,_100%_20%,_100%_100%,_0_100%,_0_0)] xl:left-[-10%]"></div>
              <div className="flex items-center justify-center absolute w-[256px] md:w-[426px] h-[313px] md:h-[522px] left-[20%] lg:left-[15%] bottom-0 xl:w-[512px] xl:h-[770px]">
                <img
                  className="w-full  "
                  src="./public/advice.webp"
                  alt="image"
                />
              </div>
              <div className="absolute top-11 md:top-24 -right-8  w-16 md:w-[5rem] h-16 md:h-[5rem] xl:w-[7rem] xl:h-[7rem] xl:right-8">
                <img className="" src="./public/cup.webp" alt="cup" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-[calc(200px/1.5)] h-[calc(115px/1.5)] bg-primary xl:w-[15rem] xl:h-[10rem]">
                <p className="text-white opacity-70 text-[10px] ml-2 mt-2 xl:text-base xl:p-3 ">
                  Hours spend
                </p>
                <div className="overflow-hidden relative w-full -top-10 pb-[57.5%] mt-7">
                  <img
                    className="absolute w-full h-full text-transparent"
                    src="./public/chart.png"
                    alt="chart"
                  />
                </div>
              </div>
              <div className=" p-3 bg-white absolute left-5 bottom-5">
                <h4 className="text-gray-800 xl:text-16 xl:text-xl lg:text-[12px] md:text-[10px] text-[8px] font-medium mb-1">
                  Course completed 🎉{" "}
                </h4>
                <ul className="text-gray-700 xl:text-base lg:text-[10px] md:text-[8px] text-[6px]">
                  <li className="flex gap-3 items-center mb-1 ">
                    <IoIosCheckmark className="w-3 h-3 bg-primary overflow-hidden rounded-md text-white" />
                    <p>Welcome aboard</p>
                  </li>
                  <li className="flex gap-3 items-center mb-1 xl:mb-2">
                    <IoIosCheckmark className="w-3 h-3 bg-primary overflow-hidden rounded-md text-white" />
                    <p>Lesson 1: Learning the Basics</p>
                  </li>
                  <li className="flex gap-3 items-center mb-1 xl:mb-2">
                    <IoIosCheckmark className="w-3 h-3 bg-primary overflow-hidden rounded-md text-white" />
                    <p>Lesson 2: Getting Confidence</p>
                  </li>
                  <li className="flex gap-3 items-center mb-1 xl:mb-2">
                    <IoIosCheckmark className="w-3 h-3 bg-primary overflow-hidden rounded-md text-white" />
                    <p> Lesson 3: Starting your first</p>
                  </li>
                  <li className="flex gap-3 items-center mb-1 xl:mb-2">
                    <IoIosCheckmark className="w-3 h-3 bg-primary overflow-hidden rounded-md text-white" />
                    <p>Lesson 4: Wrapping it up</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Animation>
        <Animation
          animation={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className=" col-span-1  mt-10 p-5 text-sm md:text-base lg:text-lg text-gray-700 font-thin xl:text-2xl xl:ml-48">
            <p className="mb-5">
              Unlock your potential with our cutting-edge e-learning platform
              designed to propel your career and expand your knowledge at any
              level. Our product offers a vast library of courses across diverse
              fields, enabling you to learn at your own pace and convenience.
              Benefit from interactive workshops, expert-led seminars, and
              industry-recognized certifications.
            </p>
            <p className="mb-10">
              Connect with mentors and peers through our networking features,
              and set clear career goals with our personalized learning paths.
              Stay ahead of the curve by embracing new technologies and honing
              essential skills like communication and problem-solving. With our
              e-learning product, you can ensure your continuous growth and
              success in an ever-evolving job market.
            </p>
            <NavLink className="bg-primary rounded-3xl px-5 py-3 font-semibold text-black">
              Discovery more
            </NavLink>
          </div>
        </Animation>
      </div>
    </section>
  );
};

export default Advice;
