import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/auth");
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
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
              <p className="w-full text-start text-sm">Already have an account? <Link to="/auth" className="w-[50%] text-blue-400 underline">Login</Link></p>

          
            <button onClick={handleSignup} className="w-full mt-2 text-center py-2 rounded-md bg-blue-400 text-white">
              Sign up
            </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
