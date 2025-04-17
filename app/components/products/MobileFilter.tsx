"use client";
import React, { Suspense, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";

export default function MobileFilter({ children }) {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="overflow-y-scroll h-full">
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <button
          onClick={closeDrawer}
          className={`w-[40px] h-[40px] rounded-[8px] flex justify-center items-center absolute top-[20px] right-[20px] z-[9999] bg-auc-light-red-color hover:bg-auc-primary-hover-color    text-white capitalize text-[13px]`}
        >
    <IoMdClose  className="text-[24px]"/>
        </button>
        <Suspense>{children}</Suspense>
      </Drawer>
      {/* filter  button*/}
      <button
        onClick={openDrawer}
        className={`min-992:hidden px-[15px] py-[8px] fixed bottom-[20px] right-[20px] bg-auc-primary-color hover:bg-auc-primary-hover-color rounded-md z-[80] text-white capitalize text-[13px] border  border-1 border-white`}
      >
        filter
      </button>
    </div>
  );
}
