import { Link, useNavigate } from "react-router-dom";

function SignUp() {
const navigate=useNavigate()
  const handleSignup=(e)=>{
  e.preventDefault()
  navigate("/auth")
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4">LOGO</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%]">
      <form className="w-full flex flex-col items-center justify-center gap-3">
          <div className="w-full">
            <label className="text-sm">Username</label>
            <div className="border-[#A2A2A7]  mt-2 rounded-md border border-solid flex items-center ">
              <input
                type="email"
                placeholder="Username"
                className="text-sm h-10 border-none w-full outline-blue-400  px-2 rounded-md"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-sm">Password</label>
            <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
              <input
                placeholder="Password"
                className="text-sm h-10 border-none w-full  outline-[.5px] outline-blue-400 px-2 rounded-md"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-sm">Confirm Password</label>
            <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
              <input
                placeholder="Confirm Password"
                className="text-sm h-10 border-none w-full  outline-[.5px] outline-blue-400 px-2 rounded-md"
              />
            </div>
          </div>

          <div className="w-full mt-3 flex items-center justify-center gap-2">
            <div className="w-[50%] flex flex-col items-center">
            <p className="text-xs md:text-sm">already have an account</p>
          <Link to="/auth" className="w-[50%] text-blue-400 underline text-center"> Login</Link>
            </div>
          <button onClick={handleSignup}
         className="w-[50%] text-center py-2 rounded-md bg-blue-400  text-white">
       sign up
      </button>
          </div>
        </form>
       
      </div>
    </div>
  );
}


export default SignUp