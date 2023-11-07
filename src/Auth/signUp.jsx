import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import ButtonComponent from "../Components/buttonComponent";

function SignUp() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/auth");
  };
//h-[700px] md:h-[650px]  2xl:h-[700px] 
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
      <div className="w-[90%] md:w-[50%] mt-[20px] md:mt-[60px] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
        <form className="w-full flex flex-col items-center justify-center gap-5">
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            style={{ width: "100%" }}
          />

          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <div className="w-full text-sm mb-3">
            <p className="p-0 mb-2  text-start text-sm">
              Already have an account?{" "}
              <Link to="/auth" className="text-blue-400 underline">
                Login
              </Link>
            </p>

            <Link
              to="/auth/business-signup"
              className="text-blue-400 underline "
            >
              Signup as a Business/School
            </Link>
          </div>
          

          <ButtonComponent
            btnName=" Sign up"
            padding={"10px "}
            loading={true}
            width="100%"
            text="white"
            onClick={handleSignup}
          />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
