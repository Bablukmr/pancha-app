import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@mui/material";
import ButtonComponent from "../Components/buttonComponent";

function SignUp() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/auth");
  };

  return (
    <div className="w-full  h-[700px] md:h-[800px] flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
      <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
        <form className="w-full flex flex-col items-center justify-center gap-3">
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <TextField
            type="email"
            label="Username"
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
          <div className="w-full  mb-3">
            <p className="p-0 m-0  text-start text-sm">
              Already have an account?{" "}
              <Link to="/auth" className="text-blue-400 underline">
                Login
              </Link>
            </p>

            <Link to="/auth" className="text-blue-400 underline ">
              sign up as a business/school
            </Link>
          </div>
          {/* <Button
            onClick={handleSignup}
            style={{
              width: "100%",
              textTransform: "none",
              padding: "10px 26px",
              backgroundColor: "#0073e6", // Change to your preferred color
              color: "white",
            }}
            variant="contained"
          >
            Sign up
          </Button> */}

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

{
  /* <div className="w-full h-screen flex flex-col items-center justify-center">
<h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
<div className="w-[80%] md:w-[50%] lg:w-[35%]">
  <form className="w-full flex flex-col items-center justify-center gap-3">
    <div className="w-full">
      <label className="text-sm">Username</label>
      <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
        <input
          type="email"
          placeholder="Username"
          className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
        />
      </div>
    </div>
    <div className="w-full">
      <label className="text-sm">Password</label>
      <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
        <input
          placeholder="Password"
          className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
        />
      </div>
    </div>
    <div className="w-full">
      <label className="text-sm">Confirm Password</label>
      <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
        <input
          placeholder="Confirm Password"
          className="text-sm h-10 border-none w-full outline-[.5px] outline-blue-400 px-2 rounded-md"
        />
      </div>
    </div>
    <p className="w-full mb-2 text-start text-sm">
      Already have an account?{" "}
      <Link to="/auth" className="w-[50%] text-blue-400 underline">
        Login
      </Link>
    </p>
    {/* <button onClick={handleSignup} className="w-full mt-2 text-center py-2 rounded-md bg-blue-400 text-white">
        Sign up
      </button> */
}
{
  /* <Button
      // disabled={SignUpLoading}
      onClick={handleSignup}
      style={{
        width: "100%",
        textTransform: "none",
        padding: "8px 26px",
      }}
      variant="contained" */
}
// endIcon={
//   LoginLoading ? (
//     <CircularProgress
//       style={{ color: "#A6A6A6" }}
//       size="1.5rem"
//     />
//   ) : (
//     ""
//   )
// }
