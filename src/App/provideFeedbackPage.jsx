import { useNavigate } from "react-router-dom";

function ProvideFeedbackPage() {
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate("/settings")
    }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form className="w-[80%] md:w-[50%] lg:w-[35%] mt-[50px] flex gap-3 flex-col items-center justify-center">
        <div className="w-full">
          <label className="text-sm">Suggest new word for the dictionary</label>
          <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
            <input
              placeholder="pre-populated with word from search"
              className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
            />
          </div>
        </div>
        <div className="w-full">
        <p>Comments? Questions? Testimonials? </p>
        <p>Please write subject and message below </p>
        </div>
        <div className="w-full">
          <label className="text-sm">Subject</label>
          <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
            <input
              className="text-sm h-10 border-none w-full outline-blue-400 px-2 rounded-md"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="text-sm">Message</label>
          <div className="border-[#A2A2A7] mt-2 rounded-md border border-solid flex items-center">
            <textarea
              className="text-sm h-[100px] border-none w-full outline-blue-400 p-2 rounded-md"
            />
          </div>
        </div>
        <div className="w-full my-2">
            <button 
            onClick={handleSubmit}
            className="bg-black text-white rounded-md px-10 py-2">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProvideFeedbackPage;
