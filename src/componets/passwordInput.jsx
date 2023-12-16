import { MdLockOutline } from "react-icons/md";
import { BiHide, BiSolidShow } from "react-icons/bi";
import { useState } from "react";

function PasswordInput({ name, placeholder, onChange,errMsg }) {
  const [password, setPassword] = useState(true);
  return (
    <div className="w-full flex flex-col gap-y-2">
      <label>
        <small className="text-base font-normal">{name} </small>
      </label>

      <div
        className="border bg-[#fafafa] rounded-md border-solid
            flex items-center px-2"
      >
        <div className="text-xl">
          <MdLockOutline />
        </div>

        <input
          onChange={onChange}
          type={password ? "password" : "text"}
          className=" text-sm h-[40px] border-none w-full bg-[#fafafa] outline-none py-4 px-2"
          placeholder={placeholder}
        />
        <div
          onClick={() => setPassword(!password)}
          className="text-xl cursor-pointer"
        >
          {password ? <BiHide /> : <BiSolidShow />}
        </div>
      </div>
      {errMsg && <small className="p-0 m-0 mt-[1px] text-[red]">{errMsg}</small>}
    </div>
  );
}

export default PasswordInput;
