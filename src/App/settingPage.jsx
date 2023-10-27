import { useState } from "react";
import ButtonComponent from "../Components/buttonComponent";
import { userLogout } from "../store/action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function SettingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const availableLanguages = [
    { id: 6, name: "Hindi" },
    { id: 1, name: "Spanish" },
    { id: 2, name: "French" },
    { id: 3, name: "Chinese" },
    { id: 5, name: "German" },
    { id: 6, name: "Japanese" },
  ];

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleLanguageChange = (language) => {
    if (selectedLanguages.includes(language.id)) {
      setSelectedLanguages(
        selectedLanguages.filter((id) => id !== language.id)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language.id]);
    }
  };

  return (
    <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
      <h1 className="text-xl my-6">Settings</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%] flex flex-col">
        <p className="my-2">Show the following languages</p>
        <div className="w-full py-2 h-[140px] overflow-y-auto ">
          {availableLanguages.map((language) => (
            <div
              key={language.id}
              className="w-full flex items-center justify-between p-2"
            >
              <div className="w-[80%]">
                <label className="ml-2">{language.name}</label>
              </div>
              <div className="w-[20%]">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language.id)}
                  onChange={() => handleLanguageChange(language)}
                />
              </div>
            </div>
          ))}
        </div>
       <p className=" border-b-2 border-black mt-4"></p>

        <div className="flex flex-col py-2 border-b-2 border-black">
          <p className="my-2">Change my password</p>
          <form className="w-full flex flex-col items-center justify-center p-2 gap-y-3">
            <div className="w-full">
              <label className="text-sm">Old Password</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center ">
                <input
                  type="password"
                  placeholder="****** Old Password"
                  className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-sm">New Password</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  type="password"
                  placeholder="****** New Password"
                  className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-sm">Confirm New Password</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  type="password"
                  placeholder="****** Confirm New Password"
                  className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
                />
              </div>
            </div>

            <div className="w-full mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => window.confirm("Change Password")}
                className="text-center py-2 px-4 rounded-md bg-blue-400 text-white"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
        <div className="w-full mb-[60px] flex justify-between items-center gap-2 mt-6">
          <ButtonComponent
            onClick={() => alert("feedback")}
            bg="black"
            text="white"
            btnName="Previous Feedback"
          />
          <ButtonComponent
            onClick={handleLogout}
            bg="black"
            text="white"
            btnName="Logout"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
