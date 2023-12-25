import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { CiUser, CiLock } from "react-icons/ci";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { IoLanguageOutline } from "react-icons/io5";
import PasswordInput from "../componets/passwordInput";
import StarRating from "../componets/rating";

function SettingPage({ setSettingPage, SettingPage }) {
  const [personalInfoDetails, setPersonalInfoDetails] = useState(true);
  const [languageDetails, setLanguageDetails] = useState(true);
  const [securityDetails, setSecurityDetails] = useState(true);
  const [feedbackDetails, setFeedbackDetails] = useState(true);

  const handlePersonalInfoDropdown = () => {
    setPersonalInfoDetails(!personalInfoDetails);
  };

  const handleLanguageDropdown = () => {
    setLanguageDetails(!languageDetails);
  };
  const handleSecurityDropdown = () => {
    setSecurityDetails(!securityDetails);
  };
  const handleFeedbackDropdown = () => {
    setFeedbackDetails(!feedbackDetails);
  };
  return (
    <div className="bg-[#F4F4F4]">
      <div className="w-full border-b fixed top-0 bg-white">
        <div className="my-[20px] flex items-center justify-between w-[90%] ml-[5%]">
          <div
            onClick={() => setSettingPage(true)}
            className="h-[40px] cursor-pointer"
          >
            <img src="/Back.png" alt="LOGO" className="max-h-full" />
          </div>
          <div className="w-[50px] h-[30px] cursor-pointer bg-[#1961C5] text-white text-xl rounded-md flex items-center justify-center">
            <TbLogout2 />
          </div>
        </div>
      </div>
      <div className=" mt-[80px] pb-4 w-[90%] ml-[5%] ">
        <h1 className="text-lg font-semibold py-4">Settings</h1>
        <div className="w-full flex gap-y-3 flex-col justify-center">
          <div className=" p-4 rounded-md bg-white flex gap-y-2 flex-col items-center justify-center">
            <div
              onClick={handlePersonalInfoDropdown}
              className="w-full flex gap-x-2 items-center justify-center "
            >
              <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center">
                <CiUser />
              </div>
              <h4 className="w-[80%] ml-4 font-semibold text-base">
                Personal Information
              </h4>
              <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                {personalInfoDetails ? <IoCaretDown /> : <IoCaretUp />}
              </div>
            </div>

            <form
              className={`w-full mt-2 ${
                personalInfoDetails ? "hidden" : "block"
              } `}
            >
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  First Name
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    placeholder="First Name"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Last name
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    placeholder="Last name"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Choose
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    placeholder="Choose"
                    type="select"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Email
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
                  cancel
                </button>
                <button className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className=" p-4 rounded-md bg-white flex gap-y-2 flex-col items-center justify-center">
            <div
              onClick={handleLanguageDropdown}
              className="w-full flex gap-x-2 items-center justify-center "
            >
              <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center">
                <IoLanguageOutline />
              </div>
              <h4 className="w-[80%] ml-4 font-semibold text-base">
                Selected languages
              </h4>
              <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                {languageDetails ? <IoCaretDown /> : <IoCaretUp />}
              </div>
            </div>

            <form
              className={`w-full mt-2 ${languageDetails ? "hidden" : "block"} `}
            >
              <div className="w-full flex items-center justify-between mt-2">
                <label className="flex items-center w-full justify-between  ">
                  <span className="text-base font-normal mr-2 cursor-pointer">
                    Spanish
                  </span>
                  <input type="radio" name="language" />
                </label>
              </div>

              <div className="w-full flex items-center justify-between mt-2">
                <label className="flex items-center w-full justify-between">
                  <span className="text-base font-normal mr-2 cursor-pointer">
                    Mandarin Chinese (Simplified)
                  </span>
                  <input type="radio" name="language" />
                </label>
              </div>

              <div className="w-full flex items-center justify-between mt-2">
                <label className="flex items-center w-full justify-between">
                  <span className="text-base font-normal mr-2 cursor-pointer">
                    French
                  </span>
                  <input type="radio" name="language" />
                </label>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
                  Cancel
                </button>
                <button className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className=" p-4 rounded-md bg-white flex gap-y-2 flex-col items-center justify-center">
            <div
              onClick={handleSecurityDropdown}
              className="w-full flex gap-x-2 items-center justify-center "
            >
              <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center">
                <CiLock />
              </div>
              <h4 className="w-[80%] ml-4 font-semibold text-base">Security</h4>
              <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                {securityDetails ? <IoCaretDown /> : <IoCaretUp />}
              </div>
            </div>

            <form
              className={`w-full mt-4 flex flex-col gap-3 ${
                securityDetails ? "hidden" : "block"
              } `}
            >
              <PasswordInput
                name="Old Password"
                placeholder="**********"
                bg="white"
                textColour="text-[#ACB5BB]"
              />
              <PasswordInput
                name="New Password"
                placeholder="**********"
                bg="white"
                textColour="text-[#ACB5BB]"
              />
              <PasswordInput
                name="Repeat New Password"
                placeholder="**********"
                bg="white"
                textColour="text-[#ACB5BB]"
              />

              <div className="flex items-center justify-between mt-4">
                <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
                  cancel
                </button>
                <button className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium">
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className=" p-4 rounded-md bg-white flex gap-y-2 flex-col items-center justify-center">
            <div
              onClick={handleFeedbackDropdown}
              className="w-full flex gap-x-2 items-center justify-center "
            >
              <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center">
                <CiUser />
              </div>
              <h4 className="w-[80%] ml-4 font-semibold text-base">Feedback</h4>
              <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                {feedbackDetails ? <IoCaretDown /> : <IoCaretUp />}
              </div>
            </div>

            <form
              className={`w-full mt-2 ${feedbackDetails ? "hidden" : "block"} `}
            >
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Full name
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    placeholder="Enter name"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Suggest a new word for the library
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    placeholder="Write word"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Subject
                </label>
                <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
                  <input
                    placeholder="Subject of Feedback"
                    type="select"
                    className="w-full outline-none border-none h-[46px]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[#ACB5BB] font-medium text-sm">
                  Write your message below
                </label>
                <div className="h-[90px] mt-2 w-full flex rounded-md  items-center justify-center border">
                  <textarea
                    type="email"
                    placeholder="Write message...."
                    className="w-full outline-none border-none h-full p-2 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-3 bg-[#F6F6F6] w-full p-2 rounded-md text-base font-medium">
                <h1>How would you rate this app?</h1>
                <StarRating
                  // value={}
                  onChange={(rating) => {
                    console.log("Selected Rating:", rating);
                  }}
                />
              </div>

              <div className="flex items-center justify-between mt-4 ">
                <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
                  cancel
                </button>
                <button className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
