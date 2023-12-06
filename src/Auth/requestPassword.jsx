import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import NotificationBox from "../Components/notificationbox";
import Loading from "../Components/loading";

function RequestPassword() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const shownotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleRequest = (e) => {
    e.preventDefault();

    if (!email) {
      setNotificationTitle("Error!");
      setNotificationBody("Email missing.");
      setNotificationType("error");
      shownotification();
      return;
    } else {
      setLoading(true);
      axios
        .post("https://api.pancha.kids/dj-rest-auth/password/reset/", {
          email: email,
        })
        .then(() => {
          setLoading(false);
          setNotificationTitle("Success!");
          setNotificationBody("Password reset link sent.");
          setNotificationType("success");
          shownotification();
        })
        .catch(() => {
          setLoading(false);
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong, try again.");
          setNotificationType("error");
          shownotification();
        });
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
                onSubmit={handleRequest}
                className="w-full mt-6 flex flex-col items-center justify-center gap-4"
              >
                <TextField
                  type="text"
                  label="Email-Id"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <small className="p-0 m-0 w-full text-start text-sm">
                  Already have an account?{" "}
                  <Link to="/auth" className="text-blue-400 underline">
                    Login
                  </Link>
                </small>

                <div className="w-full mb-3">
                  <ButtonComponent
                    type="submit"
                    btnName=" Request Password"
                    padding={"10px "}
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

export default RequestPassword;
