import AppRouts from "./appRouts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/action";
import Footer from "./footer";
import Header from "./header";

function AppLayout() {
  const [setting, setSetting] = useState("false");
  const token = useSelector((state) => state.AuthReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("ttttt", token);

  useEffect(() => {
    if (!token) {
      const tokenn = localStorage.getItem("token");
      if (tokenn) {
        dispatch(userLogin(tokenn));
      } else {
        navigate("/auth");
      }
    }

    // const path = localStorage.getItem("path");
    // console.log(path);
    // if (token) {
    //   navigate(`${path}`);
    // }
  }, [token]);

  return (
    <div className="w-full h-screen ">
      <Header setSetting={setSetting} setting={setting} />

      <div
        id="content"
        className="w-full max-h-[calc(100vh-100px)] overflow-auto"
      >
        <AppRouts />
      </div>

      <Footer setSetting={setSetting} />
    </div>
  );
}

export default AppLayout;
