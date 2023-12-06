import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import ButtonComponent from "../Components/buttonComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import NotificationBox from "../Components/notificationbox";
import Loading from "../Components/loading";
import { Typography } from "@mui/material";

function SignUp() {
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState("");

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleSignup = (e) => {
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
      .post(`https://api.pancha.kids/users/registerUser/`, {
        email: email,
        username: username,
        password1: pass,
        password2: confirm,
      })
      .then((d) => {
        setLoading(false);
        setNotificationTitle("Success!");
        setNotificationBody("User Registered.");
        setNotificationType("success");
        shownotiftion();
        setTimeout(() => {
          navigate("/auth");
        }, 400);
      })
      .catch((e) => {
        if (e?.response?.data) {
          if (e.response?.data?.email && e.response?.data?.username) {
            setNotificationTitle("Error!");
            setNotificationBody(
              "This email and username is already registered."
            );
            setNotificationType("error");
            shownotiftion();
          } else if (e.response?.data?.email) {
            setNotificationTitle("Error!");
            setNotificationBody("This email is already registered.");
            setNotificationType("error");
            shownotiftion();
          } else if (e.response?.data?.username) {
            setNotificationTitle("Error!");
            setNotificationBody("This username is already registered.");
            setNotificationType("error");
            shownotiftion();
          } else if (e.response?.data?.password1) {
            setNotificationTitle("Error!");
            setNotificationBody("Password not in correct format.");
            setNotificationType("error");
            shownotiftion();
          } else if (e.response?.data?.non_field_errors) {
            setNotificationTitle("Error!");
            setNotificationBody("Password do not match.");
            setNotificationType("error");
            shownotiftion();
          } else {
            setNotificationTitle("Error!");
            setNotificationBody("Something went wrong, try again.");
            setNotificationType("error");
            shownotiftion();
          }
        } else {
          setNotificationTitle("Error!");
          setNotificationBody("Something went wrong, try again.");
          setNotificationType("error");
          shownotiftion();
        }
        setLoading(false);
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
        <div className="w-full h-screen xl:h-[115vh] flex flex-col items-center justify-center bg-[redd]">
          <div className="h-[70px] mt-[50px] lg:mt-[100px] xl:mt-[50px] ">
            <img
              src="/panchamethod_logo.png"
              alt="logo"
              className="max-h-full"
            />
          </div>
          {/* //absolute top-[120px] */}
          <div className="flex  flex-col w-full h-full items-center justify-center">
            <div className="w-[90%] mt-[-60px] xl:mt-[-10px] md:w-[50%] lg:w-[35%]  bg-white p-5 rounded-lg shadow-lg">
              <div className="w-full  mb-3">
                <Typography
                  variant="h6"
                  component="h6"
                  className="  text-blue-600"
                >
                  Signup
                </Typography>
              </div>
              <form
                onSubmit={handleSignup}
                className="w-full mt-6 flex flex-col items-center justify-center gap-y-4"
              >
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
                    to="/auth/school-signup"
                    className="text-blue-400 mb-3 underline font-semibold"
                  >
                    <small>Sign up as a School</small>
                  </Link>
                </div>

                <ButtonComponent
                  type="submit"
                  btnName=" Sign up"
                  padding={"10px "}
                  loading={true}
                  width="100%"
                  text="white"
                  // onClick={handleSignup}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;

// <div className="w-full h-screen flex flex-col items-center ">
//   <div className="h-[70px] mt-6">
//     <img
//       src="/panchamethod_logo.png"
//       alt="logo"
//       className="max-h-full"
//     />
//   </div>

//   <div className="flex w-full h-full items-center justify-center">
//     <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white mt-6 md:mt-1 rounded-lg shadow-lg">
//       <form className="w-full flex flex-col items-center justify-center gap-3">
//         <TextField
//           type="text"
//           label="User Name"
//           variant="outlined"
//           style={{ width: "100%" }}
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//           value={username}
//         />

//         <TextField
//           type="email"
//           label="Email"
//           variant="outlined"
//           style={{ width: "100%" }}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//           value={email}
//         />
//         <TextField
//           type="password"
//           label="Password"
//           variant="outlined"
//           style={{ width: "100%" }}
//           onChange={(e) => {
//             setPass(e.target.value);
//           }}
//           value={pass}
//         />

//         <TextField
//           type="password"
//           label="Confirm Password"
//           variant="outlined"
//           style={{ width: "100%" }}
//           onChange={(e) => {
//             setConfirm(e.target.value);
//           }}
//           value={confirm}
//         />
//         <div className="w-full mt-2 h-[60px] flex flex-col justify-around">
//           <small className="p-0 m-0  text-start text-sm">
//             Already have an account?{" "}
//             <Link to="/auth" className="text-blue-400 underline">
//               Login
//             </Link>
//           </small>

//           <Link
//             to="/auth/business-signup"
//             className="text-blue-400 underline font-semibold"
//           >
//             <small>Sign up as a Business / School</small>
//           </Link>
//         </div>

//         <ButtonComponent
//           btnName=" Sign up"
//           padding={"10px "}
//           loading={true}
//           width="100%"
//           text="white"
//           onClick={handleSignup}
//         />
//       </form>
//     </div>
//   </div>
// </div>
