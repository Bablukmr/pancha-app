import React from "react";
import ButtonComponent from "../Components/buttonComponent";
import { TextField } from "@mui/material";

function NewUserPage() {
  const handleCreateUser = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[90%] my-[50px]  md:w-[50%] lg:w-[35%] bg-white p-5 rounded-lg shadow-lg">
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
          <div className="mt-4 w-full">
            <ButtonComponent
              btnName="Create New User"
              padding={"10px "}
              loading={true}
              width="100%"
              text="white"
              onClick={handleCreateUser}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUserPage;
