import { useNavigate } from 'react-router-dom'

function RequestPassword() {
const navigate=useNavigate()
const handleRequest=(e)=>{
    e.preventDefault()
navigate("/auth")
}

  return (
    
    <div className="w-full h-screen flex flex-col items-center justify-center">
         <h1 className="text-2xl my-4 absolute top-[60px]">LOGO</h1>
      <div className="w-[80%] md:w-[50%] lg:w-[35%]">
      <form className="w-full flex flex-col items-center justify-center gap-3">
      
          <div className="w-full">
            <label className="text-sm">Email-Id</label>
            <div className="border-[#A2A2A7]  mt-2 rounded-md border border-solid flex items-center ">
              <input
                type="email"
                placeholder="Email-Id"
                className="text-sm h-10 border-none w-full outline-blue-400  px-2 rounded-md"
              />
            </div>
          </div>
          <button onClick={handleRequest}
         className="w-full text-center mt-3 py-2 rounded-md bg-blue-400  text-white">
        Request Password
      </button>
        </form>
        
      </div>
    </div>
  )
}

export default RequestPassword