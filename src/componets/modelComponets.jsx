import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import CreateNewFolderModel from "./createNewFolderModel";

export default function ModelComponets() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <button
          onClick={handleOpen}
          className="flex items-center justify-center cursor-pointer bg-[#1961C5] py-2 px-3 rounded-md text-white w-fit"
        >
          <img src="/Add.png" alt="" className="h-[25px]" />
          <p className="ml-2 font-normal text-base">Add to Folder</p>
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] xl:w-[25%] md:w-[40%] bg-white shadow-lg p-4 rounded-md">
            <>
              <div>
                <div className="flex flex-col gap-2 items-start justify-start bg-b">
                  <div
                    onClick={handleClose}
                    className="p-2 text-2xl font-bold  cursor-pointer"
                  >
                    <IoMdClose />
                  </div>
                  <h1 className="text-xl font-bold">Add to Folder</h1>{" "}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full flex flex-col gap-y-4">
                  <div className="flex items-center justify-between border rounded-md p-2">
                    <div className="flex items-center gap-x-3">
                      <img src="/Apple.png" alt="/" className="h-[30px]" />
                      <p>fruits</p>
                    </div>
                    <button className="bg-[#1961C5] text-white px-4 rounded-md py-2">
                      Add
                    </button>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-2">
                    <div className="flex items-center gap-x-3">
                      <img src="/Apple.png" alt="/" className="h-[30px]" />
                      <p>fruits</p>
                    </div>
                    <button className="bg-[#1961C5] text-white px-4 rounded-md py-2">
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <CreateNewFolderModel />
                </div>

                {/* <button
                  className="w-full mt-6 mb-3 flex items-center justify-center cursor-pointer bg-[#1961C5] py-4 rounded-md text-white"
                >
                  <img src="/Add.png" alt="" className="h-[25px]" />{" "}
                  <p className="ml-2 font-normal text-base">
                    Create New Folder
                  </p>
                </button>  */}
              </div>
            </>
          </Box>
        </Modal>
      </div>
    </>
  );
}
