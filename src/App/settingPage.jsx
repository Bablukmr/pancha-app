import { useEffect, useState } from "react";
import ButtonComponent from "../Components/buttonComponent";
import { userLogout } from "../store/action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListLoading from "../Components/listLoading";
import axios from "axios";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function SettingPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [langLoading, setLangLoading] = useState(true);
  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    getCheck();
  }, []);

  const [availableLanguages, setavailableLanguages] = useState([]);

  const getCheck = () => {
    axios
      .get("https://testapi.nhustle.in/pancha/language", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        console.log("data", data);
        setavailableLanguages(data);
        setLangLoading(false);
      })
      .catch((err) => {
        console.log("Server Error", err);
      });
  };

  const handleLanguageChange = (languages) => {
    console.log("check", languages.active);
    if (languages.active) {
      axios
        .post(
          "https://testapi.nhustle.in/pancha/user-language/",
          {
            language: languages.id,
            user: 2,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )

        .then((res) => {
          getCheck();

          console.log(res);
        })
        .catch((err) => console.log("Server Error", err));
    } else {
      axios
        .delete(
          `https://testapi.nhustle.in/pancha/user-language/${languages.idd}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          console.log(data);
          getCheck();
        })
        .catch((err) => {
          console.log("Server Error", err);
        });
    }
  };

  return (
    <div className="w-full pb-4 md:pb-6 flex flex-col items-center justify-center">
      <h1 className="text-xl my-6">Settings</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%] flex flex-col">
        <p className="my-2">Show the following languages</p>

        {langLoading ? (
          <div className="h-[140px] w-full flex items-center justify-center">
            <ListLoading />
          </div>
        ) : (
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
                    checked={language.active}
                    onChange={() => handleLanguageChange(language)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

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

            <div className="w-full mt-3 flex flex-col items-start justify-center gap-2">
              {/* <button
                onClick={(e) => {
                  e.preventDefault(), window.confirm("Change Password");
                }}
                className="text-center py-2 px-4 rounded-md bg-blue-400 text-white"
              >
                Change Password
              </button> */}
              <Button
              style={{textTransform:"none" , padding: "6px 16px" }}
                onClick={(e) => {
                  e.preventDefault(), window.confirm("Change Password");
                }}
                variant="contained"
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full mb-[60px] px-2 flex flex-col justify-between items-start gap-4 mt-6">
          {/* <ButtonComponent
            onClick={() => navigate("/settings/feedback")}
            bg="black"
            text="white"
            btnName="Provide Feedback"
          /> */}

          <Button
          style={{textTransform:"none" , padding: "6px 16px" }}
            onClick={() => navigate("/settings/feedback")}
            variant="contained"
          >
            Provide Feedback
          </Button>

          {/* <ButtonComponent
            onClick={handleLogout}
            bg="black"
            text="white"
            btnName="Logout"
          /> */}
          <Button
          style={{textTransform:"none" , padding: "6px 16px" }}
            onClick={handleLogout}
            endIcon={<LogoutIcon />}
            variant="contained"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
