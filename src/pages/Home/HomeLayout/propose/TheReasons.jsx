import React from "react";
import Animation from "../../../../util/customs/Animation";

const TheReasons = () => {
  const data = [
    {
      img: "./public/homeCyber/reasons.jpg",
      title: "Reputation",
      desc: "CyberSoft affirms its reputation by committing to 100% employment for students after graduation. This commitment is concretized by a training contract from the beginning.",
    },
    {
      img: "./public/homeCyber/reasons_2.jpg",
      title: "REALITY",
      desc: "Every hour, every minute at CyberSoft is used to build real capacity for students, not a single moment is wasted.",
    },
    {
      img: "./public/homeCyber/reasons_3.jpg",
      title: "COMMIT",
      desc: "CyberSoft only succeeds when its students succeed, therefore CyberSoft devotes all its efforts to supporting and promoting the progress of its students.",
    },
    {
      img: "./public/homeCyber/reasons_4.jpg",
      title: "SAFE",
      desc: "There is no risk in studying at CyberSoft, all commitments are guaranteed through a legal contract with the company.",
    },
  ];
  return (
    <div className="container">
      <div className="my-5 px-5 md:my-10 lg:my-20 ">
        <Animation
          animation={{ y: 0, opacity: 1 }}
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="my-3 lg:pb-8 text-xl md:text-3xl lg:text-4xl text-center">
            {" "}
            <span className="text-primary">4 REASONS STUDENTS CHOOSE </span>
            CYBERSOFT
          </h2>
        </Animation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 p-3 m-3">
          {data.map((item, index) => {
            return (
              <Animation
                animation={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.8 }}
                index={index}
                delay={0.5}
                key={index}
              >
                <div className=" col-span-1 h-full bg-dark ">
                  <img
                    className="object-cover w-full h-[30vh]"
                    src={item.img}
                    alt=""
                  />
                  <div className="px-3">
                    <h3 className="text-center text-primary py-3">
                      {item.title}
                    </h3>
                    <p className="lg:text-xl font-light pb-3">{item.desc}</p>
                  </div>
                </div>
              </Animation>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TheReasons;
