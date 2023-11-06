

function ButtonComponent({ btnName, width, bg, text,onClick }) {
  return <button onClick={onClick} className={`w-${width}
    bg-black rounded-md py-2 px-4 text-${text}`}>{btnName}</button>
}
export default ButtonComponent;
