import React, { useState } from "react";
import Login from "./login";
import SignUp from "./signUp";
import Password from "./password";

function AuthLayout() {
  const [pages, setPages] = useState(true);
  const [passwordPage, setPasswordPage] = useState(false);

  return (
    <div className="md:flex">
      <div className="w-full md:w-[50%] md:px-8 md:py-5 xl:px-[100px] xl:py-[30px] bg-white h-screen flex flex-col">
        <div className="w-[90%] ml-[5%] bg-white">
          <div className="h-[50px] mt-[20px] ">
            <img
              src="/panchamethod_logo.png"
              alt="logo"
              className="max-h-full"
            />
          </div>
          <div className="h-[60px] mt-[30px] mb-[15px] flex items-center justify-around  bg-slate-100 rounded-xl ">
            <button
              onClick={() => {
                setPages(true), setPasswordPage(false);
              }}
              className={`${
                pages ? "bg-[#B170B5] text-white" : "bg-white text-[#001531]"
              } w-[45%] h-[80%] rounded-xl font-semibold text-[14px]`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setPages(false), setPasswordPage(false);
              }}
              className={`${
                pages ? "bg-white text-[#001531]" : " bg-[#B170B5] text-white"
              }  w-[45%] h-[80%] rounded-xl font-semibold text-[14px]`}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="pt-2 flex-1 overflow-y-auto ">
          {passwordPage ? (
            <Password setPasswordPage={setPasswordPage} setPages={setPages} />
          ) : pages ? (
            <Login setPasswordPage={setPasswordPage} setPages={setPages} />
          ) : (
            <SignUp setPasswordPage={setPasswordPage} setPages={setPages} />
          )}
        </div>
      </div>
      <div className="w-[50%] hidden  bg-[#1961C5] md:flex items-center justify-center relative">
        <div className="md:w-[90%] xl:w-[60%] absolute bottom-0">
          {pages ? (
            <img src="/img1.png" alt="/" className="" />
          ) : (
            <img src="/img2.png" alt="/" className="" />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
