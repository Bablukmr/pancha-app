import React, { useRef } from "react";
import EmailInput from "../componets/emailInput";
import PasswordInput from "../componets/passwordInput";
import { CiMail } from "react-icons/ci";


import { CiUser } from "react-icons/ci";


function SignUp({ setPasswordPage, setPages }) {
  const formRef = useRef(null);
  const saveData = (e) => {
    e.preventDefault();
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    console.log(formObject);
  };

  return (
    <div className="w-[90%] ml-[5%]">
      <div>
        <h1 className="text-xl font-semibold leading-[40px]">Sign up</h1>
        <p className="text-[14px]">
          Enter the details to get to your learning searching
        </p>
      </div>
      <form
        onSubmit={saveData}
        ref={formRef}
        className="w-full my-6 flex gap-y-4 flex-col items-center justify-center"
      >
        <EmailInput
          name={"First Name"}
          icon={CiUser}
          placeholder={"First Name"}
          type={"text"}
        />
        <EmailInput
          name={"Last Name"}
          icon={CiUser}
          placeholder={"Last Name"}
          type={"text"}
        />
        <EmailInput
          name={"Email"}
          icon={CiMail}
          placeholder={"email@gmail.com"}
          type={"email"}
        />
        <PasswordInput name={"Password"} placeholder={"Password"} />
        <PasswordInput
          name={"Confirm Password"}
          placeholder={"Confirm Password"}
        />
        <div className="w-full flex  items-center justify-end">
          <p
            onClick={() => setPasswordPage(true)}
            className="text-base font-medium"
          >
            Forget Password?
          </p>
        </div>
        <div className="w-full mt-[10px]">
          <button
            type="submit"
            className="bg-[#1961C5] w-full h-[45px] rounded-lg text-white font-semibold text-base"
          >
            Sign up
          </button>
        </div>
        <div className="w-full">
          <p className="text-base font-medium">
            Alredy have an account?{" "}
            <span
              onClick={() => setPages(true)}
              className="text-lg text-blue-700 underline"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
