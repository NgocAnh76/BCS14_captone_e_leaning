import React from "react";
import Animation from "../../../../util/customs/Animation";

const Benefit = () => {
  const data = [
    {
      desc: "Guide to effective learning skills",
    },
    {
      desc: "Weekly learning progress report",
    },
    {
      desc: "Instructor support throughout the course",
    },
    {
      desc: "Do projects to practice practical skills",
    },
  ];
  return (
    <section className=" bg-[url('./public/homeCyber/animou4.jpeg')] relative bg-cover bg-center min-h-[40vh] lg:h-[46.5rem] mb-20">
      <div className="absolute inset-0 bg-black/60 "></div>
      <div className="container">
        <div className="w-full relative mx-auto text-white px-4 py-12 text-center z-10 lg:px-10">
          <Animation
            animation={{ x: 0, opacity: 1 }}
            initial={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.8 }}
            delay={0.5}
          >
            <h2 className="text-white mb-8 lg:mt-10">
              STUDY PROGRAMMING AT <span>CYBERSOFT</span> YOU WILL GET
            </h2>
          </Animation>
          <div className="w-full lg:absolute  flex justify-center mb-8 lg:bottom-[-500px] xl:bottom-[-570px] lg:mt-20">
            <Animation
              animation={{ y: 0, opacity: 1 }}
              initial={{ y: 150, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="./public/homeCyber/animou.png"
                alt="Animou"
                className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              />
            </Animation>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center max-w-4xl">
            {data.map((item, index) => (
              <Animation
                animation={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.8 }}
                index={index}
                key={index}
              >
                <div
                  className={`bg-black/60 col-span-1 p-4 md:p-0 md:py-4 lg:p-5 lg:max-w-[300px] border-b-4 border-primary shadow-md lg:absolute 
                    ${index === 0 ? "top-[195px] left-[70px]" : ""}
                    ${index === 1 ? "top-[195px] right-[50px]" : ""}
                    ${index === 2 ? "lg:bottom-[-300px] left-[70px]" : ""}
                    ${index === 3 ? "lg:bottom-[-300px] right-[50px]" : ""}
                    
                    `}
                >
                  <p className="text-sm md:text-base  lg:text-xl">
                    {item.desc}
                  </p>
                </div>
              </Animation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
