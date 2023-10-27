import AppRouts from "./appRouts";
import { FiSettings, FiArrowLeft } from "react-icons/fi";
import { IoLibraryOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import SettingPage from "./settingPage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/action";

function AppLayout() {
  const [setting, setSetting] = useState(true);
  const token = useSelector((state) => state.AuthReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      const tokenn = localStorage.getItem("token");
      if (tokenn) {
        dispatch(userLogin(tokenn));
      } else {
        navigate("/auth");
        // window.location.reload();
      }
    }
  }, [token]);
  
  return (
    <div className="w-full h-[100vh] flex  flex-col justify-center items-center">
      <div className="text-2xl z-50 font-bold cursor-pointer m-4 md:m-8 fixed top-0 right-0 ">
        {setting ? (
          <FiSettings
            onClick={() => {
              setSetting(false);
            }}
          />
        ) : (
          <FiArrowLeft
            onClick={() => {
              setSetting(true);
            }}
          />
        )}
      </div>
      {setting ? (
        <AppRouts />
      ) : (
        <div className="w-full">
          
          <SettingPage />
        </div>
      )}
      <div
        onClick={() => setSetting(true)}
        className="bg-[#4C4C4C] h-[50px] w-full fixed bottom-0 flex items-center justify-center "
      >
        <Link
          to="library"
          className="text-white w-[50%] p-2 h-full flex flex-col items-center justify-center"
        >
          <IoLibraryOutline className="text-3xl" />
          <p className="text-xs">Library</p>
        </Link>
        <p className="h-[80%] bg-[#06060687] w-[2px]"></p>
        <Link
          to="dictionary"
          className="text-white w-[50%] p-2 h-full flex flex-col items-center justify-center"
        >
          <SlNotebook className="text-3xl" />
          <p className="text-xs">Dictionary </p>
        </Link>
        <p className="h-[80%] bg-[#06060687] w-[2px]"></p>
        <Link
          to="/"
          className="text-white p-2 w-[50%] h-full flex flex-col items-center justify-center"
        >
          <AiOutlineSearch className="text-3xl " />
          <p className="text-xs">Search</p>
        </Link>
        <div></div>
      </div>
    </div>
  );
}

export default AppLayout;
