import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CarCourse from "../../../../util/productCommon/CarCourse";

const CourseCarousel = (props) => {
  const { data } = props;
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600"
        onClick={onClick}
      >
        <FaAngleRight />
      </button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600"
        onClick={onClick}
      >
        <FaAngleLeft />
      </button>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {data?.map((course) => {
          return <CarCourse course={course} />;
        })}
      </Slider>
    </div>
  );
};

export default CourseCarousel;
