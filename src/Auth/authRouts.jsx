import { Route, Routes } from "react-router-dom";
import SignUp from "./signUp";
import NotFound from "../notFound";
import RequestPassword from "./requestPassword";
import Login from "./logIn";
import BusinessSignUp from "./businessSignUp";
import ForgetPasswordReset from "./forgetPasswordReset";

function AuthRouts() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="reset-password" element={<RequestPassword />} />
      <Route path="school-signup" element={<BusinessSignUp />} />
      <Route path="/reset/:uid/:token" element={<ForgetPasswordReset />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
export default AuthRouts;
