import AppRouts from "./appRouts";
import { FiSettings,FiArrowLeft } from "react-icons/fi";
import { IoLibraryOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import SettingPage from "./settingPage";
import { useState } from "react";
import { Link } from "react-router-dom";

function AppLayout() {
const [setting, setSetting] = useState(true);

  return (
    <div className="w-full h-[100vh] flex  flex-col justify-center items-center">
      <div className="text-2xl z-50 font-bold cursor-pointer m-4 fixed top-0 right-0 ">
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
        <>
          <AppRouts />
          <div className="bg-[#4C4C4C] h-[50px] w-full fixed bottom-0 flex items-center justify-center ">
            <Link to="library" className="text-white w-[50%] p-2 h-full flex flex-col items-center justify-center">
              <IoLibraryOutline className="text-3xl" />
              <p className="text-xs">Library</p>
            </Link>
            <p className="h-[80%] bg-[#06060687] w-[2px]"></p>
            <Link to='/' className="text-white p-2 w-[50%] h-full flex flex-col items-center justify-center">
              <AiOutlineSearch className="text-3xl " />
              <p className="text-xs">Search</p>
            </Link>
            <div></div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <SettingPage />
        </div>
      )}
    </div>
  );
}

export default AppLayout;
