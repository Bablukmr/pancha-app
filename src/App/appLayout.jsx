import AppRouts from "./appRouts";
import { IoLibraryOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import SettingPage from "./settingPage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/action";
import Footer from "../layout/footer";
// import Header from "../layout/header";
import Header from "../layout/header";

function AppLayout() {
  const [setting, setSetting] = useState("false");
  const token = useSelector((state) => state.AuthReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const tokenn = localStorage.getItem("token");
      if (tokenn) {
        dispatch(userLogin(tokenn));
      } else {
        navigate("/auth");
        window.location.reload();
      }
    }
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
