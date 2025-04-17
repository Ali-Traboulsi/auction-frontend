"use client";

import { Dialog } from "@material-tailwind/react";
import Image from "next/image";
import Button from "../buttons/Button";
import { IProductDetailsCard } from "../../interfaces/interfaces";
import useLanguage from "../../hook/UseLanguage";
import useCurrency from "../../hook/UseCurrency";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";

interface IDepositModal {
  page_data: any;
  openModal: any;
  handleOpenModal: any;
}

const WithdrawModal: React.FC<IDepositModal> = ({
  page_data,
  openModal,
  handleOpenModal,
}) => {
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  return (
    <>
      <Dialog
        open={openModal}
        handler={handleOpenModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-transparent shadow-none"
      >
        <div className="flex flex-col items-start gap-[24px] max-768:gap-[12px] px-[40px] max-1600:px-[30px] max-768:px-[20px] py-[32px] max-1600:py-[24px] max-768:py-[16px] rounded-[12px] w-[572px]  max-1600:w-[576px]  max-768:w-[382px] max-375:w-[337px]  m-auto bg-auc-white-color">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-[20px] text-auc-text-color-900 min-768:text-[24px] min-1440:text-[32px] leading-[130%] font-semibold">
              {t("Details!")}
            </h3>
            <span>
              <svg
                onClick={handleOpenModal}
                className="cursor-pointer max-768:w-[30px] max-768:h-[30px]"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clipPath="url(#clip0_933_3888)">
                  <path
                    d="M20 0C8.97156 0 0 8.97156 0 20C0 31.0284 8.97156 40 20 40C31.0284 40 40 31.0284 40 20C40 8.97156 31.0284 0 20 0ZM27.3651 25.0082C28.0167 25.6601 28.0167 26.7133 27.3651 27.3651C27.0401 27.6901 26.6135 27.8534 26.1865 27.8534C25.7599 27.8534 25.3333 27.6901 25.0082 27.3651L20 22.3566L14.9918 27.3651C14.6667 27.6901 14.2401 27.8534 13.8135 27.8534C13.3865 27.8534 12.9599 27.6901 12.6349 27.3651C11.9833 26.7133 11.9833 25.6601 12.6349 25.0082L17.6434 20L12.6349 14.9918C11.9833 14.3399 11.9833 13.2867 12.6349 12.6349C13.2867 11.9833 14.3399 11.9833 14.9918 12.6349L20 17.6434L25.0082 12.6349C25.6601 11.9833 26.7133 11.9833 27.3651 12.6349C28.0167 13.2867 28.0167 14.3399 27.3651 14.9918L22.3566 20L27.3651 25.0082Z"
                    fill="#F9B518"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_933_3888">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <div className="w-full">
            <div className="flex items-start justify-between py-[10px] min-768:py-[12px] min-1440:py-[16px] border-b border-auc-text-color-500">
              <h5 className="text-[18px] min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-medium leading-[130%]">
                {t("Name")}
              </h5>
              <h5 className="text-[18px] min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-normal leading-[130%]">
                {page_data?.withdraw.user?.name}
              </h5>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-start justify-between py-[10px] min-768:py-[12px] min-1440:py-[16px] border-b border-auc-text-color-500">
              <h5 className="text-[18px] min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-medium leading-[130%]">
                {t("Email")}
              </h5>
              <h5 className="text-[18px] min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-normal leading-[130%]">
                {page_data?.withdraw.user?.email}
              </h5>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-start justify-between py-[10px] min-768:py-[12px] min-1440:py-[16px] border-b border-auc-text-color-500">
              <h5 className="text-[18px] min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-medium leading-[130%]">
                {t("Amount")}
              </h5>
              <h5 className="text-[18px] capitalize min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-normal leading-[130%]">
                {c(page_data?.amount)} {symbol && symbol}
              </h5>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-start justify-between py-[10px] min-768:py-[12px] min-1440:py-[16px] border-b border-auc-text-color-500">
              <h5 className="text-[18px] min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-medium leading-[130%]">
                {t("Charge")}
              </h5>
              <h5 className="text-[18px] capitalize min-768:text-[20px] min-1440:text-[24px] text-auc-text-color-900 font-normal leading-[130%]">
                {c(page_data?.charge)} {symbol && symbol}
              </h5>
            </div>
          </div>
          <div className="flex items-start gap-[34px] max-768:gap-[12px] w-full">
            <Button
              text={t("Close")}
              styles={"auc-btn-primary w-[190px] ml-auto max-1600:text-[16px]"}
              clickHandler={handleOpenModal}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WithdrawModal;
