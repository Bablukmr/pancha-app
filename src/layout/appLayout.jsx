import AppRouts from "./appRouts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, getUserData, getLanguage } from "../store/action";
import Footer from "./footer";
import Header from "./header";
import NotificationBox from "../Components/notificationbox";

function AppLayout() {
  const token = useSelector((state) => state.AuthReducer.token);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);
  // const language = useSelector((state) => state.AuthReducer.language);
  const languageError = useSelector((state) => state.AuthReducer.languageError);

  function shownotification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  }

  useEffect(() => {
    if (languageError) {
      setNotificationTitle("Error!");
      setNotificationBody(
        "Something went wrong fetching languages, realod the app."
      );
      setNotificationType("error");
      shownotification();
    }
  }, [languageError]);

  // loadingLanguage: false,
  // languageError: null,

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const tokenn = localStorage.getItem("token");
      if (tokenn) {
        dispatch(userLogin(tokenn));
        dispatch(getUserData(tokenn));
        dispatch(getLanguage(tokenn));
      } else {
        navigate("/auth");
        window.location.reload()
      }
    } else {
      dispatch(getLanguage(token));
    }
  }, [token]);

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

      <div className="w-full h-screen ">
        <Header />

        <div
          id="content"
          className="w-full max-h-[calc(100vh-100px)] overflow-auto"
        >
          <AppRouts />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
