import { useState } from "react";
import NotificationBox from "../Components/notificationbox";
import ButtonComponent from "../Components/buttonComponent";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import Loading from "../Components/loading";
import { Link } from "react-router-dom";

export default function BusinessSignUp() {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationBody, setNotificationBody] = useState(null);

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
    if (!name) {
      setNotificationTitle("Error!");
      setNotificationBody("School name missing");
      setNotificationType("error");
      shownotiftion();
      return;
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
        school_name: name,
      })
      .then((d) => {
        setLoading(false);
        setNotificationTitle("Success!");
        setNotificationBody("School  and User Registered.");
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

  const shownotiftion = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
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
        <div className="w-full  h-screen xl:h-[120vh] flex flex-col items-center bg-[redd]">
          <div className="h-[70px] mt-[50px] lg:mt-[100px] xl:mt-[50px]">
            <img
              src="/panchamethod_logo.png"
              alt="logo"
              className="max-h-full"
            />
          </div>
          <div className="bg-yellow-400a w-full h-full flex flex-col items-center justify-center">
            <div className="w-[90%]  mt-[-60px] xl:mt-[-10px] md:w-[50%] lg:w-[35%] bg-white  md:mt-4 rounded-lg p-5 shadow-lg">
              <div className="w-full  mb-3">
                <Typography
                  variant="h6"
                  component="h6"
                  className="  text-blue-600"
                >
                  Signup as a School
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
                  type="text"
                  label="School Name"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setName(e.target.value);
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
                <small className="p-0 m-0 w-full text-start text-sm">
                  Already have an account?{" "}
                  <Link to="/auth" className="text-blue-400 underline">
                    Login
                  </Link>
                </small>
                <div className="w-full my-3">
                  <ButtonComponent
                    type="submit"
                    btnName=" Sign up"
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

        // <div className="w-full   h-screen flex flex-col items-center">
        //   <h1 className="text-2xl my-4  top-[60px]">LOGO</h1>
        //   <div className="flex w-full h-full items-center justify-center">
        //     <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white mt-20 md:mt-4 rounded-lg shadow-lg">
        //       <div className="my-4">
        //         <Typography
        //           variant="h6"
        //           component="h6"
        //           className="text-center  text-blue-600"
        //         >
        //           Signup as a Business/School
        //         </Typography>
        //       </div>

        //       <form className="w-full flex flex-col items-center justify-center gap-5">
        //         <TextField
        //           type="text"
        //           label="User Name"
        //           variant="outlined"
        //           style={{ width: "100%" }}
        //           onChange={(e) => {
        //             setUsername(e.target.value);
        //           }}
        //         />

        //         <TextField
        //           type="email"
        //           label="Email"
        //           variant="outlined"
        //           style={{ width: "100%" }}
        //           onChange={(e) => {
        //             setEmail(e.target.value);
        //           }}
        //         />
        //         <TextField
        //           type="text"
        //           label="School Name"
        //           variant="outlined"
        //           style={{ width: "100%" }}
        //           onChange={(e) => {
        //             setName(e.target.value);
        //           }}
        //         />

        //         <TextField
        //           type="password"
        //           label="Password"
        //           variant="outlined"
        //           style={{ width: "100%" }}
        //           onChange={(e) => {
        //             setPass(e.target.value);
        //           }}
        //         />

        //         <TextField
        //           type="password"
        //           label="Confirm Password"
        //           variant="outlined"
        //           style={{ width: "100%" }}
        //           onChange={(e) => {
        //             setConfirm(e.target.value);
        //           }}
        //         />
        //         <div className="w-full mt-3">
        //           <ButtonComponent
        //             btnName=" Sign up"
        //             padding={"10px "}
        //             loading={true}
        //             width="100%"
        //             text="white"
        //             onClick={handleSignup}
        //           />
        //         </div>
        //       </form>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
}
