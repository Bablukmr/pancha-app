import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import NotificationBox from "../Components/notificationbox";
import Loading from "../Components/loading";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";

export default function ForgetPasswordReset(props) {
  const { uid, token } = useParams();
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const navigate = useNavigate();

  const shownotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!pass) {
      setNotificationTitle("Error!");
      setNotificationBody("Password missing.");
      setNotificationType("error");
      shownotification();
      return;
    }

    if (!confirmPass) {
      setNotificationTitle("Error!");
      setNotificationBody("Confirm password missing.");
      setNotificationType("error");
      shownotification();
      return;
    }

    if (pass === confirmPass) {
      setLoading(true);
      axios
        .post("https://api.pancha.kids/dj-rest-auth/password/reset/confirm/", {
          uid: uid,
          token: token,
          new_password1: pass,
          new_password2: pass,
        })
        .then(() => {
          setLoading(false);
          setNotificationTitle("Success!");
          setNotificationBody("Password reset done.");
          setNotificationType("success");
          shownotification();
        })
        .catch(() => {
          setLoading(false);
          setNotificationTitle("Error!");
          setNotificationBody("Password reset done.");
          setNotificationType("error");
          shownotification();
        });
    } else {
      setNotificationTitle("Error!");
      setNotificationBody("Password do not match.");
      setNotificationType("error");
      shownotification();
      return;
    }
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
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full  h-screen flex flex-col items-center justify-center bg-[redd] ">
          <div className="h-[70px] mt-[50px] lg:mt-[100px] xl:mt-[50px]">
            <img
              src="/panchamethod_logo.png"
              alt="logo"
              className="max-h-full"
            />
          </div>
          <div className="flex  flex-col w-full h-full items-center justify-center">
            <div className="w-[90%] mt-[-60px] md:w-[50%] lg:w-[35%] bg-white p-4 rounded-lg shadow-lg">
              <div className="w-full  mb-3">
                <Typography
                  variant="h6"
                  component="h6"
                  className="  text-blue-600"
                >
                  Reset Password
                </Typography>
              </div>

              <form
                onSubmit={sendEmail}
                className="w-full mt-6 flex flex-col items-center justify-center gap-4"
              >
                <TextField
                  type="text"
                  label="Password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />

                <TextField
                  type="text"
                  label="Confirm Password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />

                <div className="w-full mb-3">
                  <ButtonComponent
                    type="submit"
                    btnName=" Reset Password"
                    padding="10px"
                    loading={true}
                    width="100%"
                    text="white"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
