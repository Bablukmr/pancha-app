import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogIn } from "../store/action";
import NotificationBox from "../Components/notificationbox";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import ButtonComponent from "../Components/buttonComponent";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.AuthReducer.token);
  const LoginLoading = useSelector((state) => state.AuthReducer.loadingLogin);
  const loginError = useSelector((state) => state.AuthReducer.loginError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    if (loginError) {
      setNotificationTitle("Error !!");
      setNotificationBody("Something went wrong.");
      setNotificationType("error");
      shownotiftion();
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
    if (!email) {
      setNotificationTitle("Error !!");
      setNotificationBody("Email missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    if (password === "") {
      setNotificationTitle("Error !!");
      setNotificationBody("Password missing.");
      setNotificationType("error");
      shownotiftion();
      return;
    }
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
      setNotificationTitle("Error !!");
      setNotificationBody("Wrong email format.");
      setNotificationType("error");
      shownotiftion();
    } else {
      dispatch(userLogIn(email, password));
      // navigate("/")
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
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl my-4 absolute top-[60px] ">LOGO</h1>
        <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
          {/* <div className="my-4">
          <Typography
            variant="h6"
            component="h6"
            className="text-center  text-blue-600"
          >
            Sign up Page
          </Typography>
        </div>  */}
          <FormControl className="w-full flex flex-col items-center justify-center gap-3">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: "100%" }}
            />

            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              style={{ width: "100%", marginTop: "10px" }}
            />

            <Link
              to="request"
              className="w-full mb-2 text-start  text-blue-400 text-sm underline"
            >
              Forgot credentials?
            </Link>

            <ButtonComponent
              padding={"10px 26px"}
              loading={true}
              startIcon={
                LoginLoading ? (
                  <CircularProgress
                    style={{ color: "#A6A6A6" }}
                    size="1.5rem"
                  />
                ) : (
                  ""
                )
              }
              width="100%"
              btnName="Login"
              disabled={LoginLoading}
              text="white"
              onClick={handleLogin}
            />

            <small className="mt-2">
              Don't have an account?{" "}
              <Link to="signup" className="text-blue-400 underline ml-1">
                Sign up
              </Link>
            </small>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Login;
