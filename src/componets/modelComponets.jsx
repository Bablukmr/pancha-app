import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModelComponets() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center cursor-pointer bg-[#1961C5] py-2 px-3 rounded-md text-white w-fit"
      >
        <img src="/Add.png" alt="" className="h-[25px]" />{" "}
        <p className="ml-2 font-normal text-base">Add to Folder</p>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white shadow-lg p-4 rounded-md">
          <>
            <div>
              <div
                onClick={handleClose}
                className="flex items-center justify-between bg-b"
              >
                <h1 className="text-xl font-bold">Add New Folder </h1>{" "}
                <div className="p-2 border rounded-full cursor-pointer">
                  <IoMdClose />
                </div>
              </div>
              <h2 className="text-base font-semibold text-[#777E90] my-3">
                Add new folder to my folders{" "}
              </h2>
            </div>
            <form>
              <div>
                <label className="font-bold text-sm ">
                  Enter New Folder Name
                </label>
                <div className="w-full border flex items-center justify-center p-1 rounded-md h-[55px] my-2 bg-[#F8F8F8]">
                  <input
                    placeholder="Enter New Folder Name"
                    className="w-full outline-none rounded-md h-[50px] text-base font-medium bg-[#F8F8F8]"
                  />
                </div>
              </div>

              <button
                onClick={handleOpen}
                className="w-full mt-6 mb-3 flex items-center justify-center cursor-pointer bg-[#1961C5] py-4 rounded-md text-white"
              >
                <img src="/Add.png" alt="" className="h-[25px]" />{" "}
                <p className="ml-2 font-normal text-base">Add Folder</p>
              </button>
            </form>
          </>
        </Box>
      </Modal>
    </div>
  );
}
