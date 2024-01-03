import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppRoute from "./appRoute";
import SettingPage from "./settingPage";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, getUserData, userLogin } from "../store/action";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AuthReducer.token);
  const initialHandlePage = localStorage.getItem("handlePage") || "search";
  const [handlePage, setHandlePage] = useState(initialHandlePage);

  useEffect(() => {
    localStorage.setItem("handlePage", handlePage);
  }, [handlePage]);

  useEffect(() => {
    if (!token) {
      const tokenn = localStorage.getItem("token");
      if (tokenn) {
        dispatch(userLogin(tokenn));
        dispatch(getUserData(tokenn));
        dispatch(getLanguage(tokenn));
      } else {
        navigate("/auth");
        window.location.reload();
      }
    } else {
      dispatch(getLanguage(token));
    }
  }, [token]);

  return (
    <>
      {/* <SettingPage/> */}
      <div className="bg-white">
        <div className="w-full border-b fixed top-0 bg-white">
          <div className="my-[20px] flex items-center justify-between w-[90%] ml-[5%]">
            <Link to="/" className="h-[40px]">
              <img
                src="/panchamethod_logo.png"
                alt="LOGO"
                className="max-h-full"
              />
            </Link>
            <div className="hidden md:flex gap-x-5">
              <Link
                to="/"
                onClick={() => setHandlePage("search")}
                className={`${
                  handlePage === "search"
                    ? "bg-[#1961C5] text-white"
                    : "bg-[#E2EAF4] text-black"
                } w-[100px] h-[50px] rounded-xl flex gap-x-1 items-center justify-center`}
              >
                <img src="/Search.png" alt="/" className="h-[20px]" />
                <p className="p-0 m-0 ">Search</p>
              </Link>

              <Link
                to="/library"
                onClick={() => setHandlePage("library")}
                className={`${
                  handlePage === "library"
                    ? "bg-[#1961C5] text-white"
                    : "bg-[#E2EAF4] text-black"
                }  text-[12px] font-semibold w-[100px] h-[50px] rounded-xl flex gap-x-1 items-center justify-center`}
              >
                <img src="/Library.png" alt="/" className="h-[20px]" />{" "}
                <p className="p-0 m-0 t">Library</p>
              </Link>

              <Link
                to="/dictionary"
                onClick={() => setHandlePage("dictionary")}
                className={`${
                  handlePage === "dictionary"
                    ? "bg-[#1961C5] text-white"
                    : "bg-[#E2EAF4] text-black"
                }  w-[120px] h-[50px] rounded-xl flex gap-x-1 items-center justify-center`}
              >
                <img src="/Dictionary.png" alt="/" className="h-[20px]" />{" "}
                <p className="p-0 m-0 ">Dictionary</p>
              </Link>
            </div>

            <div
              onClick={() => navigate("/setting")}
              className="h-[40px] cursor-pointer"
            >
              <img src="/setting.png" alt="LOGO" className="max-h-full" />
            </div>
          </div>
        </div>

        <div className="bg-white my-[80px] md:mt-[90px] h-full overflow-y-auto ">
          <AppRoute />
        </div>

        <div className="fixed w-full bottom-0 md:hidden">
          <div className="flex bg-[#F8F8F8] py-[16px] px-[10px] gap-[8px] items-center justify-around ">
            <Link
              to="/"
              onClick={() => setHandlePage("search")}
              className={`${
                handlePage === "search"
                  ? "bg-[#1961C5] text-white"
                  : "bg-[#E2EAF4] text-black"
              } w-[100px] h-[50px] rounded-xl flex gap-x-1 items-center justify-center`}
            >
              <img src="/Search.png" alt="/" className="h-[20px]" />{" "}
              <p className="p-0 m-0 ">Search</p>
            </Link>

            <Link
              to="/library"
              onClick={() => setHandlePage("library")}
              className={`${
                handlePage === "library"
                  ? "bg-[#1961C5] text-white"
                  : "bg-[#E2EAF4] text-black"
              }  text-[12px] font-semibold w-[100px] h-[50px] rounded-xl flex gap-x-1 items-center justify-center`}
            >
              <img src="/Library.png" alt="/" className="h-[20px]" />{" "}
              <p className="p-0 m-0 t">Library</p>
            </Link>

            <Link
              to="/dictionary"
              onClick={() => setHandlePage("dictionary")}
              className={`${
                handlePage === "dictionary"
                  ? "bg-[#1961C5] text-white"
                  : "bg-[#E2EAF4] text-black"
              }  w-[110px] h-[50px] rounded-xl flex gap-x-1 items-center justify-center `}
            >
              <img src="/Dictionary.png" alt="/" className="h-[20px]" />
              <p className="p-0 m-0 ">Dictionary</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
