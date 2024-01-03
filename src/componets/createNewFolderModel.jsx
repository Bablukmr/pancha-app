import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";

export default function CreateNewFolderModel({handleAddFolder,value,onChange,handleOpen,handleClose,open}) {


  return (
    <div>
      <button
        onClick={handleOpen}
        className={`flex items-center justify-center cursor-pointer bg-[#1961C5] py-3 px-3 rounded-md text-white w-full`}
      >
        +<p className="ml-2 font-normal text-base">Create New Folder</p>
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
              <div className="flex items-center justify-between bg-b">
                <h1 className="text-xl font-bold">Create New Folder</h1>{" "}
                <div
                  onClick={handleClose}
                  className="p-2 border rounded-full cursor-pointer"
                >
                  <IoMdClose />
                </div>
              </div>
              <h2 className="text-base font-semibold text-[#777E90] my-3">
                Add new folder to my folders{" "}
              </h2>
            </div>
            <form onSubmit={handleAddFolder}>
              <div>
                <label className="font-bold text-sm ">
                  Enter New Folder Name
                </label>
                <div className="w-full border flex items-center justify-center p-1 rounded-md h-[55px] my-2 bg-[#F8F8F8]">
                  <input
                  value={value}
                  onChange={onChange}
                    placeholder="Enter New Folder Name"
                    className="w-full outline-none rounded-md h-[50px] text-base font-medium bg-[#F8F8F8] px-2"
                  />
                </div>
              </div>

              <button
                // onClick={handleOpen}
                type="submit"
                className="w-full mt-6 mb-3 flex items-center justify-center cursor-pointer bg-[#1961C5] py-4 rounded-md text-white"
              >
                <img src="/Add.png" alt="" className="h-[25px]" />{" "}
                <p className="ml-2 font-normal text-base">Create Folder</p>
              </button>
            </form>
          </>
        </Box>
      </Modal>
    </div>
  );
}
