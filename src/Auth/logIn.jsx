import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogIn } from "../store/action";
import NotificationBox from "../Components/notificationbox";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.AuthReducer.token);
  const LoginLoading = useSelector((state) => state.AuthReducer.loadingLogin);
  const loginError = useSelector((state) => state.AuthReducer.loginError);
  // console.log(loginError);

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
    }, 5000);
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
        <div className="w-[80%] md:w-[50%] lg:w-[35%]">
          <form className="w-full flex flex-col items-center justify-center gap-3">
            <div className="w-full">
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
            </div>
            <div className="w-full">
              <label className="text-sm">Password</label>
              <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
                <input
                  placeholder="Password"
                  className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Link
              to="request"
              className="w-full text-start text-blue-400 text-sm underline"
            >
              Forgot credentials?
            </Link>
            <button
              disabled={LoginLoading}
              onClick={handleLogin}
              className="w-full mt-2 text-center py-2 rounded-md bg-blue-400 text-white"
            >
              {LoginLoading ? " Login..." : "Login"}
            </button>
          </form>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to="signup" className="text-blue-400 underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
