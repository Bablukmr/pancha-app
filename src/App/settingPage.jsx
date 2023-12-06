import { useEffect, useState } from "react";
import ButtonComponent from "../Components/buttonComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListLoading from "../Components/listLoading";
import axios from "axios";
import { TextField } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationBox from "../Components/notificationbox";
import { setSettings, userLogout, getLanguage } from "../store/action";

function SettingPage() {
  const token = useSelector((state) => state.AuthReducer.token);

  const availableLanguages = useSelector((state) => state.AuthReducer.language);
  const langLoading = useSelector((state) => state.AuthReducer.loadingLanguage);

  // const [langLoading, setLangLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  // const [availableLanguages, setavailableLanguages] = useState([]);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.AuthReducer.userData);
  const userId = userData?.id;

  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    dispatch(setSettings(false));
  }, []);

  useEffect(() => {
    if (token) {
      getLanguage();
    }
  }, [token]);

  // const getLanguage = () => {
  // setLangLoading(true);
  // axios
  // .get("https://api.pancha.kids/pancha/user-language", {
  // headers: {
  // Authorization: `Token ${token}`,
  // },
  // })
  // .then((d) => {
  // setavailableLanguages(d.data);
  // setLangLoading(false);
  // })
  // .catch((err) => {
  // setLangLoading(false);
  // setNotificationTitle("Error!");
  // setNotificationBody(
  // "Something went wrong fetching languages, try again."
  // );
  // setNotificationType("error");
  // shownotification();
  // });
  // };

  const handleLanguageChange = (data) => {
    if (data.active) {
      axios
        .put(
          `https://api.pancha.kids/pancha/user-language/${data?.id}/`,
          {
            language: data.language,
            user: userId,
            active: false,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(getLanguage(token));
          // getLanguage();
          setNotificationTitle("Success!");
          setNotificationBody("Language hidden.");
          setNotificationType("success");
          shownotification();
        })
        .catch((err) => {
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong, try again.");
          setNotificationType("error");
          shownotification();
        });
    } else {
      axios
        .put(
          `https://api.pancha.kids/pancha/user-language/${data?.id}/`,
          {
            language: data.language,
            user: userId,
            active: true,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(getLanguage(token));

          setNotificationTitle("Success!");
          setNotificationBody("Language shown.");
          setNotificationType("success");
          shownotification();
        })
        .catch((err) => {
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong, try again.");
          setNotificationType("error");
          shownotification();
        });
    }
  };

  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }

  const changePassword = () => {
    setPassLoading(true);
    axios
      .post(
        "https://api.pancha.kids/dj-rest-auth/password/change/",
        {
          old_password: oldPass,
          new_password1: pass,
          new_password2: confirm,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((d) => {
        setPassLoading(false);
        setOldPass("");
        setPass("");
        setConfirm("");

        setNotificationTitle("Success!");
        setNotificationBody("Password changed");
        setNotificationType("success");
        shownotification();
      })
      .catch((e) => {
        setPassLoading(false);
        setNotificationTitle("Error!");
        setNotificationBody("Something went wrong, try again");
        setNotificationType("error");
        shownotification();
      });
  };

  return (
    <>
      <div
        className={`fixed top-6 right-0 shadow-lg z-50 w-80 rounded-2xl transition-transform duration-300 transform ${
          showNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NotificationBox
          title={notificationTitle}
          body={notificationBody}
          setShowNotification={setShowNotification}
          type={notificationType}
        />
      </div>

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
              {availableLanguages.map((d) => (
                <div
                  key={d.id}
                  className="w-full flex items-center justify-between p-2"
                >
                  <div className="w-[80%]">
                    <label className="ml-2">{d.name}</label>
                  </div>
                  <div className="w-[20%]">
                    <input
                      type="checkbox"
                      checked={d.active}
                      onChange={() => handleLanguageChange(d)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className=" border-b-2 border-black mt-4"></p>

          {passLoading ? (
            <div className="h-[160px] mt-6 w-full flex items-center justify-center">
              <ListLoading />
            </div>
          ) : (
            <div className="flex flex-col py-2 border-b-2 border-black">
              <p className="my-2">Change my password</p>
              <form className="w-full flex flex-col items-center justify-center p-2 gap-y-5">
                <TextField
                  value={oldPass}
                  size="small"
                  id="outlined-basic"
                  label="Old Password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setOldPass(e.target.value);
                  }}
                />

                <TextField
                  value={pass}
                  size="small"
                  id="outlined-basic"
                  label="New Password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />

                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Confirm New Password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />

                <div className="w-full mt-3 flex flex-col items-start justify-center gap-2">
                  <ButtonComponent
                    btnName="Change Password"
                    padding={"6px "}
                    loading={true}
                    width="140px"
                    text="white"
                    onClick={changePassword}
                  />
                </div>
              </form>
            </div>
          )}

          <div className="w-full mb-[60px] px-2 flex flex-col justify-between items-start gap-4 mt-6">
            <ButtonComponent
              btnName="Provide Feedback"
              padding={"6px "}
              width="140px"
              text="white"
              onClick={() => {
                // dispatch(setSettings(true));
                navigate("/settings/feedback");
              }}
            />

            {userData?.college && (
              <ButtonComponent
                btnName="Create New User"
                padding={"6px "}
                width="140px"
                text="white"
                onClick={() => navigate("/new-user")}
              />
            )}

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
    </>
  );
}

export default SettingPage;
