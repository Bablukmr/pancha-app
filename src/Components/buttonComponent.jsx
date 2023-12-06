import { Button } from "@mui/material";

function ButtonComponent({
  disabled,
  btnName,
  width,
  bg,
  text,
  onClick,
  startIcon,
  padding,
  buttonType,
  type,
}) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      color={buttonType}
      style={{
        width: `${width}`,
        textTransform: "none",
        padding: `${padding}`,
        // backgroundColor: "#0073e6",
        color: `${text}`,
      }}
      variant="contained"
      startIcon={startIcon}
    >
      {btnName}
    </Button>
  );
}
export default ButtonComponent;

{
  /* <button onClick={onClick} className={`w-${width}
  bg-black rounded-md py-2 px-4 text-${text}`}>{btnName}</button> */
}
