import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";

function SideMenu() {
  const [subMenu3, setSubMenu3] = useState(false);

  return (
    <div className="w-full h-screen bg-slate-200">
      <div className="w-[60%] md:w-[35%] xl:w-[20%] h-full bg-[#2B3087] text-white">
        <ul className="w-full pt-10 text-lg font-medium flex flex-col items-center justify-center gap-5">
          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">Dashbord</p>
          </li>

          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">Manual</p>
          </li>
          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">Training</p>
          </li>
          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">News</p>
          </li>
          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">Report Damage</p>
          </li>
          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">Vehicals</p>
          </li>

          <li className="w-[90%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]">
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] text-start">Users</p>
          </li>

          <li
            onClick={() => setSubMenu3(!subMenu3)}
            className="w-[90%] px-[7%] rounded-md h-[40px] flex gap-2 items-center justify-center cursor-pointer hover:bg-[#878ac593]"
          >
            <div className="w-[10%]">
              <AiOutlineHome />
            </div>
            <p className="w-[70%] ml-[2%] text-start">Settings</p>
            <div className="w-[10%] ">
              {subMenu3 ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
            </div>
          </li>
        </ul>

        <ul
          className={`w-full mt-3 mr text-lg font-medium flex flex-col items-center justify-center gap-3 ${
            subMenu3
              ? "max-h-[200px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          } transition-all duration-300`}
        >
          <li className="w-[90%] rounded-md h-[40px] flex items-center cursor-pointer justify-center hover:bg-[#878ac593]">
            SubMenu1
          </li>
          <li className="w-[90%] rounded-md h-[40px] flex items-center cursor-pointer justify-center hover:bg-[#878ac593]">
            SubMenu2
          </li>
          <li className="w-[90%] rounded-md h-[40px] flex items-center cursor-pointer justify-center hover:bg-[#878ac593]">
            SubMenu3
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
