import React from "react";

import ButtonComponent from "../Components/buttonComponent";
import { TextField, Typography } from "@mui/material";

export default function BusinessSignUp() {
  return (
    <div className="w-full  h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
      <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
        <div className="my-4">
          <Typography
            variant="h6"
            component="h6"
            className="text-center  text-blue-600"
          >
            Signup as a School
          </Typography>
        </div>

        <form className="w-full flex flex-col items-center justify-center gap-5">
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <TextField
            type="email"
            label="Name"
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
          <div className="w-full mt-3">
            <ButtonComponent
              btnName=" Sign up"
              padding={"10px "}
              loading={true}
              width="100%"
              text="white"
              // onClick={handleSignup}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
