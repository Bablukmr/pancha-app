import { useEffect, useState } from "react";
import ButtonComponent from "../Components/buttonComponent";
import { userLogout } from "../store/action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListLoading from "../Components/listLoading";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function SettingPage() {
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.AuthReducer.userData);
  const userId = userData?.id;

  const [langLoading, setLangLoading] = useState(true);
  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    if (token) getCheck();
  }, [token]);

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
        setavailableLanguages(data);
        setLangLoading(false);
      })
      .catch((err) => {
        console.log("Server Error", err);
      });
  };

  const handleLanguageChange = (languages) => {
    if (languages.active) {
      axios
        .post(
          "https://testapi.nhustle.in/pancha/user-language/",
          {
            language: languages.id,
            user: userId,
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
          <form className="w-full flex flex-col items-center justify-center p-2 gap-y-5">
            <TextField
              size="small"
              id="outlined-basic"
              label="Old Password"
              variant="outlined"
              style={{ width: "100%" }}
            />

            <TextField
              size="small"
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              style={{ width: "100%" }}
            />

            <TextField
              size="small"
              id="outlined-basic"
              label="Confirm New Password"
              variant="outlined"
              style={{ width: "100%" }}
            />

            <div className="w-full mt-3 flex flex-col items-start justify-center gap-2">
              <ButtonComponent
                btnName="Change Password"
                padding={"6px "}
                loading={true}
                width="140px"
                text="white"
                onClick={(e) => {
                  e.preventDefault(), window.confirm("Change Password");
                }}
              />
            </div>
          </form>
        </div>
        <div className="w-full mb-[60px] px-2 flex flex-col justify-between items-start gap-4 mt-6">
          <ButtonComponent
            btnName="Provide Feedback"
            padding={"6px "}
            width="140px"
            text="white"
            onClick={() => navigate("/settings/feedback")}
          />

          <ButtonComponent
            btnName="Create New User"
            padding={"6px "}
            width="140px"
            text="white"
            onClick={() => navigate("/new-user")}
          />

          <ButtonComponent
            btnName="Logout"
            padding={"6px "}
            startIcon={<LogoutIcon />}
            loading={true}
            width="100px"
            text="white"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
