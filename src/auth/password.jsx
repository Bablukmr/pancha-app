import React, { useRef } from "react";
import EmailInput from "../componets/emailInput";
import { CiMail } from "react-icons/ci";

function Password({ setPasswordPage, setPages }) {
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
        <h1 className="text-xl font-semibold leading-[40px]">
          Reauest Password
        </h1>
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
          name={"Request Password"}
          icon={CiMail}
          placeholder={"Email"}
          type={"email"}
        />
        <div className="w-full mt-[10px]">
          <button
            type="submit"
            className="bg-[#1961C5] w-full h-[45px] rounded-lg text-white font-semibold text-base"
          >
            Request Password
          </button>
        </div>
        <div className="w-full">
          <p className="text-base font-medium">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                setPasswordPage(false), setPages(false);
              }}
              className="text-lg text-blue-700 underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Password;
