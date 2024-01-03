import PasswordInput from "./passwordInput";

export const Persnal = ({ value }) => {
  return (
    <form className={`w-full mt-2 p-4 ${value ? "hidden" : "block"} `}>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">First Name</label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            placeholder="First Name"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">Last name</label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            placeholder="Last name"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">Choose</label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            placeholder="Choose"
            type="select"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">Email</label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
          cancel
        </button>
        <button className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium">
          Save
        </button>
      </div>
    </form>
  );
};

export const Language = ({ value }) => {
  return (
    <form className={`w-full mt-2 p-4 ${value ? "hidden" : "block"}`}>
      <div className="w-full flex items-center justify-between mt-2">
        <label className="flex items-center w-full justify-between">
          <span className="text-base font-medium mr-2 cursor-pointer">
            Spanish
          </span>
          <input
            type="checkbox"
            name="language"
            checked={selectedLanguages.Spanish}
            onChange={() => handleCheckboxChange("Spanish")}
          />
        </label>
      </div>

      <div className="w-full flex  items-center justify-between mt-4">
        <label className="flex items-center w-full justify-between">
          <span className="text-base font-medium mr-2 cursor-pointer">
            Mandarin Chinese (Simplified)
          </span>
          <input
            type="checkbox"
            name="language"
            checked={selectedLanguages["Mandarin Chinese"]}
            onChange={() => handleCheckboxChange("Mandarin Chinese")}
          />
        </label>
      </div>

      <div className="w-full mt-4 flex items-center justify-between">
        <label className="flex items-center w-full justify-between">
          <span className="text-base font-medium mr-2 cursor-pointer">
            French
          </span>
          <input
            type="checkbox"
            name="language"
            checked={selectedLanguages.French}
            onChange={() => handleCheckboxChange("French")}
          />
        </label>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium"
          type="button"
        >
          Cancel
        </button>
        <button
          className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium"
          type="button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export const Security = ({ value }) => {
  return (
    <form
      className={`w-full mt-4 p-4 flex flex-col gap-3 ${
        value ? "hidden" : "block"
      } `}
    >
      <PasswordInput
        name="Old Password"
        placeholder="**********"
        bg="white"
        textColour="text-[#ACB5BB]"
      />
      <PasswordInput
        name="New Password"
        placeholder="**********"
        bg="white "
        textColour="text-[#ACB5BB]"
      />
      <PasswordInput
        name="Repeat New Password"
        placeholder="**********"
        bg="white"
        textColour="text-[#ACB5BB]"
      />

      <div className="flex items-center justify-between mt-4">
        <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
          cancel
        </button>
        <button className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium">
          Save
        </button>
      </div>
    </form>
  );
};

export const Feedbacks = ({ value }) => {
  return (
    <form className={`w-full mt-2 p-4 ${value ? "hidden" : "block"} `}>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">Full name</label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            placeholder="Enter name"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">
          Suggest a new word for the library
        </label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            placeholder="Write word"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">Subject</label>
        <div className="h-[50px] mt-2 w-full flex rounded-md px-2  items-center justify-center border">
          <input
            placeholder="Subject of Feedback"
            type="select"
            className="w-full outline-none border-none h-[46px] placeholder:text-black"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[#ACB5BB] font-medium text-sm">
          Write your message below
        </label>
        <div className="h-[90px] mt-2 w-full flex rounded-md  items-center justify-center border">
          <textarea
            type="email"
            placeholder="Write message...."
            className="w-full outline-none border-none h-full p-2 rounded-md placeholder:text-black"
          />
        </div>
      </div>

      <div className="mt-3 bg-[#F6F6F6] w-full p-2 rounded-md text-base font-medium">
        <h1>How would you rate this app?</h1>
        <StarRating
          // value={}
          onChange={(rating) => {
            console.log("Selected Rating:", rating);
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-4 ">
        <button className="w-[45%] py-2 border rounded-md text-black bg-white text-base font-medium">
          cancel
        </button>
        <button
          onClick={handleOpen}
          className="w-[45%] py-2 border rounded-md text-white bg-[#1961C5] text-base font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
