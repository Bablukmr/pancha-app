import React, { useRef } from "react";
import EmailInput from "../componets/emailInput";
import PasswordInput from "../componets/passwordInput";
import { MdOutlineEmail } from "react-icons/md";

function Login() {
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
        <h1 className="text-xl font-semibold leading-[40px]">Login</h1>
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
          name={"Email"}
          icon={MdOutlineEmail}
          placeholder={"email@gmail.com"}
          type={"email"}
          errMsg={"opopkjed opwqe"}
        />
        <EmailInput
          name={"Email"}
          icon={MdOutlineEmail}
          placeholder={"email@gmail.com"}
          type={"email"}
          errMsg={"hewq powq"}
        />
        <PasswordInput name={"Password"} placeholder={"email@gmail.com"}  />
        <div></div>
        <div className="w-full mt-[10px]">
          <button
            // onClick={saveData}
            type="submit"
            className="bg-[#1961C5] w-full h-[45px] rounded-lg text-white font-semibold text-base"
          >
            Login
          </button>
        </div>
        <div className="w-full">
          <p className="text-base font-medium">
            Don’t have an account?{" "}
            <span className="text-lg text-blue-700 underline">SignUp</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
