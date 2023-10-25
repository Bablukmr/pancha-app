import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("token", true);
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4 absolute top-[60px] ">LOGO</h1>
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
          <div className="w-full mt-3 flex items-center justify-center gap-2">
            <Link to="request" className="w-[50%] text-blue-400 text-sm underline text-center">Forgot credentials?</Link>
            <button
              onClick={handleLogin}
              className="w-[50%] text-center py-2 rounded-md bg-blue-400 text-white"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center text-sm mt-3">
          <p>Don't have an account? </p> <Link to="signup" className="text-blue-400 underline ml-1">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
