import React, { useEffect, useRef, useState } from "react";
import EmailInput from "../componets/emailInput";
import PasswordInput from "../componets/passwordInput";
import { CiMail } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userLogIn } from "../store/action";
import Notificationbox from "../componets/notificationbox";

function Login({ setPasswordPage, setPages }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const token = useSelector((state) => state.AuthReducer.token);
  const LoginLoading = useSelector((state) => state.AuthReducer.loadingLogin);
  const loginError = useSelector((state) => state.AuthReducer.loginError);

  const loginErrorMsg = useSelector((state) => state.AuthReducer.loginErrorMsg);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  useEffect(() => {
    if (loginErrorMsg) {
      if (loginErrorMsg?.non_field_errors) {
        setNotificationTitle("Error!");
        setNotificationBody("Can not log in with provided credentials.");
        setNotificationType("error");
        shownotiftion();
      }
    }
  }, [loginErrorMsg]);

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    if (loginError) {
      if (!loginErrorMsg?.non_field_errors) {
        setNotificationTitle("Error!");
        setNotificationBody("Something went wrong.");
        setNotificationType("error");
        shownotiftion();
      }
    }
  }, [loginError]);

  const Path = localStorage.getItem("path");

  useEffect(() => {
    if (Path) {
      if (token) navigate(Path);
    } else {
      if (token) navigate("/");
    }
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("hhhh");
    if (!email) {
      setNotificationTitle("Error!");
      setNotificationBody("Email missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    if (password === "") {
      setNotificationTitle("Error!");
      setNotificationBody("Password missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (!regexEmail.test(email)) {
    //   setNotificationTitle("Error!");
    //   setNotificationBody("Wrong email format.");
    //   setNotificationType("error");
    //   shownotiftion();
    // }
    // else {
    dispatch(userLogIn(email, password));
    // navigate("/")
    // }
  };

  // const saveData = (e) => {
  //   e.preventDefault();
  //   var data = new FormData(event.target);
  //   let formObject = Object.fromEntries(data.entries());
  //   console.log(formObject);
  //   localStorage.setItem("token", Math.random() * 24);
  //   Navigate("/");

  //   axios
  //     .post("https://testapi.nhustle.in/dj-rest-auth/login/", {
  //       username: "admin",
  //       password: "Pass@1234",
  //     })
  //     .then((d) => {
  //       console.log(d.data);
  //       localStorage.setItem("token", d.data.key);
  //     });
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <div
        className={`fixed top-6 right-0 shadow-lg z-50 w-80 rounded-2xl transition-transform duration-300 transform ${
          showNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Notificationbox
          title={notificationTitle}
          body={notificationBody}
          setShowNotification={setShowNotification}
          type={notificationType}
        />
      </div>
      <div className="w-[90%] ml-[5%]">
        <div>
          <h1 className="text-xl font-semibold leading-[40px]">Login</h1>
          <p className="text-[14px]">
            Enter the details to get to your learning searching
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          ref={formRef}
          className="w-full my-6 flex gap-y-4 flex-col items-center justify-center"
        >
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"Email"}
            icon={CiMail}
            placeholder={"email@gmail.com"}
            type={"text"}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={"Password"}
            placeholder={"Password"}
            bg="bg-[#F6F6F6]"
          />
          <div className="w-full flex  items-center justify-end">
            {/* <Link>Forget Password?</Link> */}
            <p
              onClick={() => setPasswordPage(true)}
              className="text-base font-medium cursor-pointer"
            >
              Forget Password?
            </p>
          </div>
          <div className="w-full mt-[10px]">
            <button
              type="submit"
              className="bg-[#1961C5] w-full h-[45px] rounded-lg text-white font-semibold text-base"
            >
              Login
            </button>
          </div>
          <div className="w-full">
            <p className="text-base font-medium">
              Don’t have an account?{" "}
              <span
                onClick={() => setPages(false)}
                className="text-lg text-blue-700 underline"
              >
                SignUp
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
