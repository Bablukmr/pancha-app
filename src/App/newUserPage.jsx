import { useState } from "react";
import ButtonComponent from "../Components/buttonComponent";
import { TextField } from "@mui/material";
import axios from "axios";
import NotificationBox from "../Components/notificationbox";
import Loading from "../Components/loading";
import { useSelector } from "react-redux";

function NewUserPage() {
  const userData = useSelector((state) => state.AuthReducer.userData);
  const schoolId = userData?.college;

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

  const handleCreateUser = (e) => {
    e.preventDefault();

    if (!username) {
      setNotificationTitle("Error!");
      setNotificationBody("Username missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }

    if (!email) {
      setNotificationTitle("Error!");
      setNotificationBody("Email missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    } else {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regexEmail.test(email)) {
        setNotificationTitle("Error!");
        setNotificationBody("Wrong email format.");
        setNotificationType("error");
        shownotiftion();
        return;
      }
    }
    if (!pass) {
      setNotificationTitle("Error!");
      setNotificationBody("Password missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    if (!confirm) {
      setNotificationTitle("Error!");
      setNotificationBody("Confirm Password missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    setLoading(true);

    axios
      .post(`https://api.pancha.kids/users/registerSchoolUser/`, {
        email: email,
        username: username,
        password1: pass,
        password2: confirm,
        school_id: schoolId,
      })
      .then((d) => {
        setLoading(false);
        setNotificationTitle("Success!");
        setNotificationBody("User Registered.");
        setNotificationType("success");
        shownotiftion();
      })
      .catch(() => {
        setLoading(false);
        setNotificationTitle("Error!");
        setNotificationBody("Something went wrong, try again.");
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

      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-[90%] my-[50px]  md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
            <form className="w-full flex flex-col items-center justify-center gap-3">
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
                type="text"
                label="Username"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setUsername(e.target.value);
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
              <div className="mt-4 w-full">
                <ButtonComponent
                  btnName="Create New User"
                  padding={"10px "}
                  loading={true}
                  width="100%"
                  text="white"
                  onClick={handleCreateUser}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewUserPage;
