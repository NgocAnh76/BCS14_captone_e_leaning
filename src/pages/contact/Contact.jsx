import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
const Contact = () => {
  const social = [
    {
      to: "https://mail.google.com/",
      icon: <MdEmail className="text-xl md:text-2xl lg:text-4xl" />,
      subtitle: "Email",
      desc: "trogiup@cybersoft.com",
    },
    {
      to: "https://maps.app.goo.gl/sp9EY115RvvXsEzX9",
      icon: <FaLocationDot className="text-xl md:text-2xl lg:text-4xl" />,
      subtitle: "Office",
      desc: "11 Đ. Cao Thắng, Phường 2, Quận 3, Hồ Chí Minh",
    },
    {
      to: "tell:0123456789",
      icon: <FaPhone className="text-xl md:text-2xl lg:text-4xl" />,
      subtitle: "Phone",
      desc: "0123456789",
    },
  ];
  return (
    <>
      <div className=" pt-14 md:pt-20 ">
        <div className="relative overflow-hidden min-h-36 bg-[#fdefbf] ">
          <div className="absolute h-full left-0 top-0 max-w-[20%] lg:max-w-[25%]">
            <img
              className="w-full h-full "
              src="./public/banner_sd.svg"
              alt="banner_sd"
            />
          </div>
          <div className="absolute h-full left-0 top-0 max-w-[23%] ">
            <img
              className=" w-full h-full opacity-40"
              src="./public/banner_sd2.svg"
              alt="banner_sd"
            />
          </div>
          <div className="absolute h-full left-[2%] max-w-[20%] lg:max-w-[28%] xl:left-[10%] xxl:left-[10%] top-[20%] z-50 ">
            <img
              className="opacity-15"
              src="./public/banner_sd5.svg"
              alt="banner_sd"
            />
          </div>
          <div className="absolute h-full right-0 top-[65%] z-50 max-w-[20%] lg:max-w-[25%] ">
            <img
              className="opacity-20"
              src="./public/banner_sd3.svg"
              alt="banner_sd"
            />
          </div>
          <div className="absolute h-full right-[2%] lg:right-[4%] xl:right[6%] top-[55%] z-50  max-w-[14%] lg:max-w-[15%]  xxl:max-w-[20%]">
            <img className="" src="./public/banner_sd4.svg" alt="banner_sd" />
          </div>
          <div className="absolute h-full right-[3%] xl:right-[6%] xxl:right-[4.4%] top-[65%] lg:top-[82%]  z-50  max-w-[12%] lg:max-w-[11%] xxl:max-w-[20%]">
            <img
              className="opacity-50"
              src="./public/banner_sd6.svg"
              alt="banner_sd"
            />
          </div>
          <section className=" relative pb-[25.5%] mt-3 md:mt-0">
            <div className="flex items-center justify-center flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-thin text-center">
              <h2 className="text-xl md:text-3xl lg:text-8xl font-medium">
                Contact <span className="text-primary">Us</span>{" "}
              </h2>
              <p className="text-[12px] md:max-w-[80%] lg:text-2xl">
                Are you curious, looking for suggestions, or seeking smart
                solutions? Contact us!
              </p>
            </div>
          </section>
        </div>
        <section className=" py-10 md:py-20 container px-5">
          <ul className="flex lg:items-center lg:justify-between md:px-10 flex-col gap-8 lg:gap-28 lg:flex-row lg:ml-20">
            {social.map((item, index) => (
              <li key={index} className="lg:w-[calc(100%/3)]">
                <NavLink
                  className="bg-gray-400 rounded-3xl"
                  to={item.to}
                  target="_blank"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-primary flex items-center justify-center rounded-full mb-3 cursor-pointer">
                    {item.icon}
                  </div>
                  <p className=" text-base md:text-xl lg:text-2xl">
                    {item.subtitle}
                  </p>
                  <p className=" text-sm md:text-base lg:text-2xl text-primary md:max-w-[200px] lg:max-w-[410px]">
                    {item.desc}
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Contact;
