"use client";

import { Dialog } from "@material-tailwind/react";
import React from "react";
import Button from "../buttons/Button";
import { IRemoveModalCard } from "../../interfaces/interfaces";

const RemoveModalCard: React.FC<IRemoveModalCard> = ({ openRemoveModal, handleOpenRemoveModal, title, confirmationText, remove_btn_text,handleRemove }) => {
  return (
    <>
      <Dialog
        open={openRemoveModal}
        handler={handleOpenRemoveModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-transparent shadow-none"
      >
        <div className="flex flex-col items-start gap-[24px] max-576:gap-[12px] p-[40px] max-576:p-[20px] rounded-[12px] w-[514px] max-576:w-[370px] max-375:w-[300px]  m-auto bg-auc-white-color">
          <h4 className=" text-[20px] min-768:text-[24px] min-1200:text-[32px] text-auc-text-color-900 font-semibold leading-[130%]">
            {title}
          </h4>
          <h5 className=" text-[16px] min-768:text-[20px] min-1200:text-[24px] text-auc-text-color-900  font-normal leading-[130%] pb-[40px] max-576:pb-[20px]">
            {confirmationText}
          </h5>
          <div className="flex max-576:flex-col items-start gap-[24px] max-576:gap-[12px] w-full">
            <Button text={"Close"} styles={"auc-btn-secondary w-1/2 max-576:w-full !px-0 !text-[17px]"} clickHandler={handleOpenRemoveModal} />
            <Button text={remove_btn_text} styles={"auc-btn-primary w-1/2 max-576:w-full !px-0 !text-[17px]"} 
            clickHandler={handleRemove} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RemoveModalCard;
