// import * as React from "react";
import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { CiUser, CiLock } from "react-icons/ci";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { IoLanguageOutline } from "react-icons/io5";
import PasswordInput from "../componets/passwordInput";
import StarRating from "../componets/rating";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

function SettingPage() {
  const Navigate = useNavigate();
  const [personalInfoDetails, setPersonalInfoDetails] = useState(true);
  const [languageDetails, setLanguageDetails] = useState(true);
  const [securityDetails, setSecurityDetails] = useState(true);
  const [feedbackDetails, setFeedbackDetails] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handlePersonalInfoDropdown = () => {
    setPersonalInfoDetails(!personalInfoDetails);
    setLanguageDetails(true);
    setSecurityDetails(true);
    setFeedbackDetails(true);
  };

  const handleLanguageDropdown = () => {
    setLanguageDetails(!languageDetails);
    setPersonalInfoDetails(true);
    setSecurityDetails(true);
    setFeedbackDetails(true);
  };
  const handleSecurityDropdown = () => {
    setSecurityDetails(!securityDetails);
    setPersonalInfoDetails(true);
    setFeedbackDetails(true);
    setLanguageDetails(true);
  };
  const handleFeedbackDropdown = () => {
    setFeedbackDetails(!feedbackDetails);
    setPersonalInfoDetails(true);
    setSecurityDetails(true);
    setLanguageDetails(true);
  };

  const [selectedLanguages, setSelectedLanguages] = useState({
    Spanish: true,
    "Mandarin Chinese": false,
    French: false,
  });

  const handleCheckboxChange = (language) => {
    setSelectedLanguages({
      ...selectedLanguages,
      [language]: !selectedLanguages[language],
    });
  };

  const handleSave = () => {
    console.log("Selected Languages:", selectedLanguages);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };

  const Persnal = () => {
    return (
      <form
        className={`w-full mt-2 p-4 ${
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
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
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
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="text-[#ACB5BB] font-medium text-sm">Choose</label>
          <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
            <input
              placeholder="Choose"
              type="select"
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="text-[#ACB5BB] font-medium text-sm">Email</label>
          <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
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
    );
  };

  const Language = () => {
    return (
      <form
        className={`w-full mt-2 p-4 ${languageDetails ? "hidden" : "block"}`}
      >
        <div className="w-full flex items-center justify-between mt-2">
          <label className="flex items-center w-full justify-between">
            <span className="text-base font-medium mr-2 cursor-pointer">
              Spanish
            </span>
            <input
              type="checkbox"
              name="language"
              checked={selectedLanguages.Spanish}
              onChange={() => handleCheckboxChange("Spanish")}
            />
          </label>
        </div>

        <div className="w-full flex  items-center justify-between mt-4">
          <label className="flex items-center w-full justify-between">
            <span className="text-base font-medium mr-2 cursor-pointer">
              Mandarin Chinese (Simplified)
            </span>
            <input
              type="checkbox"
              name="language"
              checked={selectedLanguages["Mandarin Chinese"]}
              onChange={() => handleCheckboxChange("Mandarin Chinese")}
            />
          </label>
        </div>

        <div className="w-full mt-4 flex items-center justify-between">
          <label className="flex items-center w-full justify-between">
            <span className="text-base font-medium mr-2 cursor-pointer">
              French
            </span>
            <input
              type="checkbox"
              name="language"
              checked={selectedLanguages.French}
              onChange={() => handleCheckboxChange("French")}
            />
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium"
            type="button"
          >
            Cancel
          </button>
          <button
            className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    );
  };
  const Security = () => {
    return (
      <form
        className={`w-full mt-4 p-4 flex flex-col gap-3 ${
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
          bg="white "
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
    );
  };

  const Feedbacks = () => {
    return (
      <form
        className={`w-full mt-2 p-4 ${feedbackDetails ? "hidden" : "block"} `}
      >
        <div className="mt-3">
          <label className="text-[#ACB5BB] font-medium text-sm">
            Full name
          </label>
          <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
            <input
              placeholder="Enter name"
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
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
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="text-[#ACB5BB] font-medium text-sm">Subject</label>
          <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
            <input
              placeholder="Subject of Feedback"
              type="select"
              className="w-full outline-none border-none h-[46px] placeholder:text-black"
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
              className="w-full outline-none border-none h-full p-2 rounded-md placeholder:text-black"
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
          <button
            onClick={handleOpen}
            className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-slate-200 shadow-lg p-4 rounded-md">
            <>
              <div className="">
                <div className="flex gap-2 items-start justify-between bg-b">
                  <h1 className="text-xl font-bold">Add to Folder</h1>{" "}
                  <div
                    onClick={handleClose}
                    className="p-2 text-2xl font-bold  cursor-pointer"
                  >
                    <IoMdClose />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[#777E90] font-normal text-base">
                  Thank you for your feedback, your feedback is important to us.
                </p>
              </div>
              <Link
                to="/"
                className="w-full flex items-center justify-center py-2 bg-[#1961C5] rounded-md mt-[120px] font-semibold text-base text-white"
              >
                Go Home
              </Link>
            </>
          </Box>
        </Modal>
      </div>

      <div className="bg-[#F4F4F4] h-screen md:h-0">
        <div className="w-full border-b fixed top-0 bg-white">
          <div className="my-[20px] flex items-center justify-between w-[90%] ml-[5%]">
            <div
              onClick={() => Navigate("/")}
              className="h-[40px] cursor-pointer"
            >
              <img src="/Back.png" alt="LOGO" className="max-h-full" />
            </div>
            <div
              onClick={handleLogout}
              className="w-[50px] h-[30px] cursor-pointer bg-[#1961C5] text-white text-xl rounded-md flex items-center justify-center"
            >
              <TbLogout2 />
            </div>
          </div>
        </div>
        <div className=" pb-4 w-[90%] ml-[5%] md:hidden ">
          <h1 className="text-lg font-semibold py-4">Settings</h1>
          <div className="w-full flex gap-y-3 flex-col justify-center">
            <div className="  rounded-md bg-white flex gap-y-2 flex-col items-center justify-center cursor-pointer">
              <div
                onClick={handlePersonalInfoDropdown}
                className="w-full flex gap-x-2 items-center justify-center p-4"
              >
                <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center justify-center">
                  <CiUser />
                </div>
                <h4 className="w-[80%] ml-4 font-semibold text-base">
                  Personal Information
                </h4>
                <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                  {personalInfoDetails ? <IoCaretDown /> : <IoCaretUp />}
                </div>
              </div>
              <Persnal />
            </div>

            <div className=" rounded-md bg-white flex gap-y-2 flex-col items-center justify-center cursor-pointer">
              <div
                onClick={handleLanguageDropdown}
                className="w-full flex gap-x-2 items-center justify-center p-4 "
              >
                <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center justify-center">
                  <IoLanguageOutline />
                </div>
                <h4 className="w-[80%] ml-4 font-semibold text-base">
                  Selected languages
                </h4>
                <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                  {languageDetails ? <IoCaretDown /> : <IoCaretUp />}
                </div>
              </div>
              <Language />
            </div>

            <div className=" rounded-md bg-white flex gap-y-2 flex-col items-center justify-center cursor-pointer">
              <div
                onClick={handleSecurityDropdown}
                className="w-full flex gap-x-2 items-center justify-center  p-4"
              >
                <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center justify-center">
                  <CiLock />
                </div>
                <h4 className="w-[80%] ml-4 font-semibold text-base">
                  Security
                </h4>
                <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                  {securityDetails ? <IoCaretDown /> : <IoCaretUp />}
                </div>
              </div>

              <Security />
            </div>

            <div className="rounded-md bg-white flex gap-y-2 flex-col items-center justify-center cursor-pointer">
              <div
                onClick={handleFeedbackDropdown}
                className="w-full flex gap-x-2 items-center justify-center  p-4 "
              >
                <div className="w-[10%] font-bold text-xl p-1 rounded-full bg-slate-200 flex items-center justify-center">
                  <RiMessage2Line />
                </div>
                <h4 className="w-[80%] ml-4 font-semibold text-base">
                  Feedback
                </h4>
                <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
                  {feedbackDetails ? <IoCaretDown /> : <IoCaretUp />}
                </div>
              </div>
              <Feedbacks />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden px-[60px] pt-[20px] md:flex gap-4  bg-[#F4F4F4] h-0 md:h-screen">
        <div className="md:w-[40%] xl:w-[40%] bg-white flex flex-col gap-y-3 rounded-md h-fit">
          <div
            onClick={handlePersonalInfoDropdown}
            className={`w-full flex gap-x-2 items-center justify-center p-4 cursor-pointer  rounded-md`}
          >
            <div className="w-[10%] font-bold text-xl p-2 md:p-1 xl:p-2 rounded-full bg-slate-200 flex items-center justify-center">
              <CiUser />
            </div>
            <h4 className="md:w-[80%] xl:w-[60%] ml-4 font-semibold text-base md:text-sm">
              Personal Information
            </h4>
            <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
              <GoChevronRight />
            </div>
          </div>

          <div
            onClick={handleLanguageDropdown}
            className="w-full flex gap-x-2 items-center justify-center p-4 cursor-pointer"
          >
            <div className="w-[10%] font-bold text-xl p-2 md:p-1 xl:p-2 rounded-full bg-slate-200 flex items-center justify-center">
              <IoLanguageOutline />
            </div>
            <h4 className="md:w-[80%] xl:w-[60%] ml-4 font-semibold text-base md:text-sm">
              Selected languages
            </h4>
            <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
              <GoChevronRight />
            </div>
          </div>

          <div
            onClick={handleSecurityDropdown}
            className="w-full flex gap-x-2 items-center justify-center p-4 cursor-pointer"
          >
            <div className="w-[10%] font-bold text-xl p-2 md:p-1 xl:p-2 rounded-full bg-slate-200 flex items-center justify-center">
              <CiLock />
            </div>
            <h4 className="md:w-[80%] xl:w-[60%] ml-4 font-semibold text-base md:text-sm">
              Security
            </h4>
            <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
              <GoChevronRight />
            </div>
          </div>

          <div
            onClick={handleFeedbackDropdown}
            className="w-full flex gap-x-2 items-center justify-center p-4 cursor-pointer"
          >
            <div className="w-[10%] font-bold text-xl p-2 md:p-1 xl:p-2 rounded-full bg-slate-200 flex items-center justify-center">
              <RiMessage2Line />
            </div>
            <h4 className="md:w-[80%] xl:w-[60%] ml-4 font-semibold text-base md:text-sm">
              Feedback
            </h4>
            <div className="w-[10%] font-bold text-2xl text-[#5CA3FF]">
              <GoChevronRight />
            </div>
          </div>
        </div>
        <div className="md:w-[60%] xl:w-[80%] h-fit bg-white  rounded-md">
          <Persnal />
          <Language />
          <Security />
          <Feedbacks />
        </div>
      </div>
    </>
  );
}

export default SettingPage;
