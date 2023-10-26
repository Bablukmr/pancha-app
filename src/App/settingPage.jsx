import { useState } from "react";
import ButtonComponent from "../Components/buttonComponent";

function SettingPage() {

const handleLogout=()=>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      window.location.reload();
    }
}

  const availableLanguages = ["Spanish", "French", "Chinese"];
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleLanguageChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((item) => item !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-xl">Settings</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%] flex flex-col">
        <div className="w-full py-2 border-b-2 border-black">
          <p className="my-2">Show the following language</p>
          {availableLanguages.map((language, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-2 "
            >
              <div className="w-[80%]">
                <label className="ml-2">{language}</label>
              </div>
              <div className="w-[20%]">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col py-2 border-b-2 border-black">
          <p className="my-2">Change my password</p>
          <form className="w-full flex flex-col items-center justify-center p-2 gap-y-3">
            <div className="w-full">
              <label className="text-sm">old password</label>
              <div className="border-[#A2A2A7]  mt-2 rounded-md border border-solid flex items-center ">
                <input
                  type="email"
                  placeholder=" ****** old password"
                  className="text-sm h-10 border-none w-full outline-blue-400  px-2 rounded-md"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-sm">new password</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  placeholder=" ****** new password"
                  className="text-sm h-10 border-none w-full  outline-[.5px] outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-sm">confirm new password</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  placeholder=" ****** confirm new password"
                  className="text-sm h-10 border-none w-full  outline-[.5px] outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>

            <div className="w-full mt-3 flex items-center justify-center gap-2">
              <button onClick={(e) =>{ e.preventDefault(), window.confirm("Change Password")}} className=" text-center py-2 px-4 rounded-md bg-blue-400  text-white">
                Change Password
              </button>

            </div>
          </form>
            
        </div>
        <div className="w-full flex justify-between items-center gap-2 mt-5">
     <ButtonComponent onClick={()=>alert("feedback")} bg="black" text="white" btnName="Previous Feedback"/>
     <ButtonComponent onClick={handleLogout} bg="black" text="white" btnName="Logout"/>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
