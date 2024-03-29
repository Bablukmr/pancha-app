import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";
import ButtonComponent from "../Components/buttonComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import NotificationBox from "../Components/notificationbox";

function SignUp() {
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username) {
      setNotificationTitle("Error !!");
      setNotificationBody("Username missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }

    if (!email) {
      setNotificationTitle("Error !!");
      setNotificationBody("Email missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    } else {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regexEmail.test(email)) {
        setNotificationTitle("Error !!");
        setNotificationBody("Wrong email format.");
        setNotificationType("error");
        shownotiftion();
        return;
      }
    }
    if (!pass) {
      setNotificationTitle("Error !!");
      setNotificationBody("Password missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    if (!confirm) {
      setNotificationTitle("Error !!");
      setNotificationBody("Confirm Password missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    setLoading(true);

    axios
      .post(`https://testapi.nhustle.in/dj-rest-auth/registration/`, {
        email: email,
        username: username,
        password1: pass,
        password2: confirm,
      })
      .then((d) => {
        setLoading(false);

        setNotificationTitle("Success !!");
        setNotificationBody("User Registered.");
        setNotificationType("success");
        shownotiftion();
      })
      .catch(() => {
        setLoading(false);
        setNotificationTitle("Error !!");
        setNotificationBody("SOmething went wrong, try again.");
        setNotificationType("error");
        shownotiftion();
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

      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
        <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
          <form className="w-full flex flex-col items-center justify-center gap-3">
            <TextField
              type="text"
              label="User Name"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <TextField
              type="email"
              label="Email"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />

            <TextField
              type="password"
              label="Confirm Password"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
            />
            <div className="w-full mt-2 h-[60px] flex flex-col justify-around">
              <small className="p-0 m-0  text-start text-sm">
                Already have an account?{" "}
                <Link to="/auth" className="text-blue-400 underline">
                  Login
                </Link>
              </small>

              <Link
                to="/auth/business-signup"
                className="text-blue-400 underline font-semibold"
              >
                <small>Sign up as a Business / School</small>
              </Link>
            </div>

            <ButtonComponent
              btnName=" Sign up"
              padding={"10px "}
              loading={true}
              width="100%"
              text="white"
              onClick={handleSignup}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
