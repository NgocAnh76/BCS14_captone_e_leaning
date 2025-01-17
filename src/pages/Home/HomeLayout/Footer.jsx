import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="grid grid-cols-6 gap-8 p-10">
            <div className="col-span-6 md:col-span-3 lg:col-span-2 lg:pl-20">
              <NavLink className="navbar-brand" to="/">
                <img
                  src="./public/logoSybersoft.png"
                  alt=""
                  className="h-8 md:h-10 lg:h-[70px]"
                />
              </NavLink>
              <div>
                <ul className="flex item-center ">
                  <li>
                    <NavLink className="footer_social">
                      <i className="fa-brands fa-facebook-f"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer_social">
                      <i className="fa-brands fa-youtube"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer_social">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-3 lg:col-span-1">
              <h3 className="text-sm md:text-base xl:text-lg font-semibold ">
                Product
              </h3>
              <ul>
                <li>
                  <NavLink className="footer_item">Courses</NavLink>
                </li>
                <li>
                  <NavLink className="footer_item">Blog</NavLink>
                </li>
                <li>
                  <NavLink className="footer_item">Contact us</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-span-3 md:col-span-3 lg:col-span-1">
              <h3 className="text-sm md:text-base xl:text-lg font-semibold">
                General policies & support
              </h3>
              <ul>
                <li>
                  <NavLink className="footer_item">Blogs</NavLink>
                </li>
                <li>
                  <NavLink className="footer_item">Team of service</NavLink>
                </li>
                <li>
                  <NavLink className="footer_item">Privacy policy</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <h3 className="text-sm md:text-base xl:text-lg font-semibold ">
                Stay up to date
              </h3>
              <ul>
                <li className="d-flex flex-no-wrap">
                  <input type="text" placeholder="Email" />
                  <button>Get update</button>
                </li>
                <li>
                  <NavLink className="footer_item">Hotline:0123456789</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p>https://cybersoft.edu.vn/</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
