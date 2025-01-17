import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const Evaluate = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const dataEvaluate = [
    {
      name: "Ellie",
      desc: "Teachers must have a separate teaching plan and achieve good results.",
    },
    {
      name: "Yaretzi",
      desc: "The only thing that is a bit regrettable is that because I am still studying, I cannot apply the knowledge I have learned in my work.",
    },
    {
      name: "Cheryl",
      desc: "The lecturer is very enthusiastic and teaches with heart.",
    },
    {
      name: "Bambalina",
      desc: "After attending the course, I feel very satisfied with the teacher's spirit and teaching style.",
    },
    {
      name: "Farah",
      desc: "The teacher taught and answered questions very enthusiastically. The course content was logical and easy to understand.",
    },
  ];
  const renderAvatar = () => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const avatar = data.results[0].picture.large;
        setAvatarUrl(avatar);
      })
      .catch((error) => console.error("Error fetching avatar:", error));
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute top-[68%] right-4 md:right-16 -translate-y-3/4 z-10 text-primary border-none p-2 rounded-full"
        onClick={() => {
          renderAvatar();
          onClick();
        }}
      >
        <FaAngleRight />
      </button>
    );
  };
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute top-[68%] left-4 md:left-16 -translate-y-3/4 z-10 text-primary border-none p-2 rounded-full"
        onClick={() => {
          renderAvatar();
          onClick();
        }}
      >
        <FaAngleLeft />
      </button>
    );
  };
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <section className="w-full h-[70vh] relative">
      <div className="bg-bannerEvaluate w-full h-full bg-cover bg-center box-border absolute ">
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-60 "></div>
        <div className="container">
          <div className="text-center my-auto pt-10 md:pt-20 lg:pt-40">
            <h2 className="text-white text-xl font-semibold md:text-3xl lg:text-6xl">
              What students say about CyberSoft
            </h2>
            <div className="mx-auto w-3/4 md:w-2/3 mt-10">
              <Slider {...settings}>
                {dataEvaluate.map((item, index) => {
                  return (
                    <div
                      className="text-white opacity-90 text-sm md:text-lg lg:text-xl"
                      key={index}
                    >
                      <p>{item.desc}</p>
                      <p className="text-primary text-xl md:text-2xl lg:text-4xl mt-3">
                        {item.name}
                      </p>
                      <div className="my-auto mt-3 px-10">
                        <img
                          className="mx-auto rounded-full overflow-hidden w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                          src={
                            avatarUrl ||
                            "https://randomuser.me/api/portraits/men/75.jpg"
                          }
                          alt="avatar random"
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evaluate;
