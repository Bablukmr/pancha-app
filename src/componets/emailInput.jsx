function EmailInput({
  name,
  icon: IconComponent,
  placeholder,
  type,
  onChange,
  errMsg,
}) {
  return (
    <div className="w-full flex flex-col gap2">
      <label>
        <small className="text-base font-normal">{name} </small>
      </label>

      <div
        className="border bg-[#F6F6F6] mt-2 rounded-md border-solid
          flex items-center px-4"
      >
        <div className="text-xl">
          <IconComponent />
        </div>

        <input
          onChange={onChange}
          type={type}
          className=" text-sm h-[45px] border-none w-full bg-[#F6F6F6] outline-none py-4 px-2"
          placeholder={placeholder}
        />
      </div>
      {errMsg && <small className="p-0 m-0 mt-[1px] text-[red]">{errMsg}</small>}
    </div>
  );
}

export default EmailInput;
