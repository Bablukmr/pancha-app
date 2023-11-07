import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/buttonComponent";

function RequestPassword() {
  const navigate = useNavigate();

  const handleRequest = (e) => {
    e.preventDefault();
    navigate("/auth");
  };

  //bg-gradient-to-b from-blue-200 to-blue-400

  return (
    <div className="w-full  h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
      <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white p-4 rounded-lg shadow-lg">
      
      {/* <div className="my-3">
        
         <Typography
          variant="h6"
          component="h6"
          className="text-center text-blue-600"
        >
          Password Reset
        </Typography>
        </div>  */}
        <FormControl className="w-full flex flex-col items-center justify-center gap-6">
          <TextField
            type="email"
            label="Email-Id"
            variant="outlined"
            style={{ width: "100%" }}
          />

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
          <ButtonComponent
            btnName=" Request Password"
            padding={"10px "}
            loading={true}
            width="100%"
            text="white"
            onClick={handleRequest}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default RequestPassword;
