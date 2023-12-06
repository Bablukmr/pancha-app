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
} from "@mui/material";
import ButtonComponent from "../Components/buttonComponent";
import { Typography } from "@mui/material";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!regexEmail.test(email)) {
      setNotificationTitle("Error!");
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

      <div className="w-full h-screen flex flex-col justify-center items-center bg-[reda]">
        <div className="h-[70px] mt-[50px] lg:mt-[100px] xl:mt-[50px]">
          <img src="/panchamethod_logo.png" alt="logo" className="max-h-full" />
        </div>
        <div className="flex bg-yellow-500a flex-col w-full h-full items-center justify-center">
          <div className="w-[90%] bg-slate-500a mt-[-60px] md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
            <div className="w-full  mb-3">
              <Typography
                variant="h6"
                component="h6"
                className="  text-blue-600"
              >
                Login
              </Typography>
            </div>
            <form
              onSubmit={handleLogin}
              className="w-full mt-6 flex flex-col items-center justify-center gap-y-4"
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
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
                to="reset-password"
                className="w-full mb-3 text-start text-blue-400 text-sm underline"
              >
                Forgot credentials?
              </Link>

              <ButtonComponent
                type="submit"
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
                // onClick={handleLogin}
              />

              <small className="my-2 w-full">
                Don't have an account?{" "}
                <Link to="signup" className="text-blue-400 underline ml-1">
                  Sign up
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="w-full h-screen flex flex-col items-center bg-[redd]">
        <div className="h-[70px] mt-6">
          <img src="/panchamethod_logo.png" alt="logo" className="max-h-full" />
        </div>

        <div className="flex w-full h-full items-center justify-center">
          <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
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
                className="w-full mb-2 text-start text-blue-400 text-sm underline"
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
      </div> */}
    </>
  );
}

export default Login;

{
  /* <div className="w-[80%] md:w-[50%] lg:w-[35%]">
<FormControl  className="w-full flex flex-col items-center justify-center gap-3"> */
}
{
  /* <div className="w-full">
    <label className="text-sm">Username</label>
    <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
      <input
        type="email"
        placeholder="Username"
        className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div> */
}
{
  /* <TextField
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="email"
    size="small"
    id="outlined-basic"
    label="Username"
    variant="outlined"
    style={{ width: "100%" }}
  /> */
}

{
  /* <div className="w-full">
    <label className="text-sm">Password</label>
    <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
      <input
        placeholder="Password"
        className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </div> */
}

{
  /* <TextField
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    id="outlined-basic"
    label="Password"
    variant="outlined"
    style={{ width: "100%", marginTop: "10px" }}
  /> */
}

{
  /* <Link
    to="request"
    className="w-full mb-2 text-start text-blue-400 text-sm underline"
  >
    Forgot credentials?
  </Link> */
}
{
  /* <button
    disabled={LoginLoading}
    onClick={handleLogin}
    className="w-full mt-2 text-center py-2 rounded-md bg-blue-400 text-white"
  >
    {LoginLoading ? " Login..." : "Login"}
  </button> */
}
{
  /* <Button
    disabled={LoginLoading}
    onClick={handleLogin}
    style={{
      width: "100%",
      textTransform: "none",
      padding: "6px 26px",
    }}
    variant="contained"
    color="success"
    endIcon={
      LoginLoading ? (
        <CircularProgress
          style={{ color: "#A6A6A6" }}
          size="1.5rem"
        />
      ) : (
        ""
      )
    }
  > */
}
{
  /* Login
  </Button>
</FormControl>
<p className="mt-2">
  Don't have an account?{" "}
  <Link to="signup" className="text-blue-400 underline ml-1">
    Sign up
  </Link>
</p>
</div>  */
}
