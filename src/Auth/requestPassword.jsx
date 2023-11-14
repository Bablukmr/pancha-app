import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";

function RequestPassword() {
  const navigate = useNavigate();

  const handleRequest = (e) => {
    e.preventDefault();
    navigate("/auth");
  };

  //bg-gradient-to-b from-blue-200 to-blue-400

  return (
    <div className="w-full  h-screen flex flex-col items-center justify-center bg-[redd] ">
      {/* <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1> */}
      <div className="h-[70px] mt-[50px] lg:mt-[100px] xl:mt-[50px]">
        <img src="/panchamethod_logo.png" alt="logo" className="max-h-full" />
      </div>
      <div className="flex  flex-col w-full h-full items-center justify-center">
        <div className="w-[90%] mt-[-60px] md:w-[50%] lg:w-[35%] bg-white p-4 rounded-lg shadow-lg">
        <div className="w-full  mb-3">
              <Typography
                variant="h6"
                component="h6"
                className="  text-blue-600"
              >
                Reset Password
              </Typography>
            </div>
          <form
            onSubmit={handleRequest}
            className="w-full mt-6 flex flex-col items-center justify-center gap-4"
          >
            
            <TextField
              type="text"
              label="Email-Id"
              variant="outlined"
              style={{ width: "100%" }}
            />
            <small className="p-0 m-0 w-full text-start text-sm">
              Already have an account?{" "}
              <Link to="/auth" className="text-blue-400 underline">
                Login
              </Link>
            </small>
            {/* <Button
            onClick={handleRequest}
            style={{
              width: "100%",
              textTransform: "none",
              padding: "10px 26px",
              backgroundColor: "#0073e6", // Change to your preferred color
              color: "white",
            }}
            variant="contained"
          >
            Request Password
          </Button> */}
            <div className="w-full mb-3">
              <ButtonComponent
                type="submit"
                btnName=" Request Password"
                padding={"10px "}
                loading={true}
                width="100%"
                text="white"
                // onClick={handleRequest}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestPassword;
