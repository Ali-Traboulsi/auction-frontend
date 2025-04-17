"use client";

import React, { useState } from "react";
import ProductDetailsCard from "../../cards/ProductDetailsCard";
import IconButton from "../../buttons/IconButton";
import { ILogsTable } from "../../../interfaces/interfaces";
import Cookies from "js-cookie";
import WithdrawModal from "../../cards/WithdrawModal";
import useLanguage from "../../../hook/UseLanguage";
import useCurrency from "../../../hook/UseCurrency";
import useCurrencySymbol from "../../../hook/UseCurrencySymbol";

const TABLE_HEAD = [
  "S.N.",
  "Transaction ID",
  "Amount",
  "Status",
  "Date",
  "View",
];

const WithdrawLogsTable: React.FC<ILogsTable> = ({
  title,
  table_data,
  handleSearchField,
  defaultSearchInput,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [activeModalId, setactiveModalId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [searchInput, setSearchInput] = useState(defaultSearchInput);
  const token = Cookies.get("user_token");
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();
  const handleOpenModal = () => setOpenModal(!openModal);

  // fetch winners modal data
  function getModalData(bid_id) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/withdraw-preview/${bid_id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setModalData(data.data);
        setOpenModal(true);
      })
      .catch((err) => {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      });
  }

  
  const handleModalWithId = (id) => {
    setactiveModalId(id);
    getModalData(id);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchField(searchInput);
  };

  const showStatus = (status) => {
    switch (status) {
      case 0:
        return t("Pending");

      case 1:
        return t("Complete");

      case 2:
        return t("Rejected");

      default:
        return t("Pending");
    }
  };
  return (
    <>
      {/* Search and Title Start */}
      <div className="auc-primary-heading-container">
        <h2 className="">{t(title)}</h2>
        <div className="w-full min-768:w-[250px] min-1440:w-[333px] ">
          {/* Search */}
          <form onSubmit={handleSearchSubmit}>
            <div className="w-full flex items-center">
              <input
                className="relative z-10 left-[5px] flex outline-auc-primary-color justify-center items-center gap-[10px] border border-auc-border-color px-[16px] py-[19px] w-full h-[60px] rounded-l-[8px]"
                type="text"
                autoComplete="off"
                name="search"
                defaultValue={searchInput}
                id="search"
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Transaction ID"
              />
              <button
                type="submit"
                className="flex w-[60px] p-[18px] items-start gap-[10px] rounded-r-[8px] bg-auc-primary-color hover:bg-auc-primary-hover-color transition-all ease-in-out duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M23.5783 21.5722L18.9657 16.9596C20.3637 15.1296 21.1303 12.9099 21.1306 10.5677C21.1306 7.74502 20.0313 5.09112 18.0351 3.09523C16.0392 1.09934 13.3856 0 10.5626 0C7.73998 0 5.08608 1.09934 3.09019 3.09523C-1.03006 7.21583 -1.03006 13.9202 3.09019 18.0401C5.08608 20.0363 7.73998 21.1357 10.5626 21.1357C12.9049 21.1354 15.1246 20.3687 16.9546 18.9708L21.5671 23.5833C21.8446 23.8611 22.2088 24 22.5727 24C22.9366 24 23.3008 23.8611 23.5783 23.5833C24.1339 23.0281 24.1339 22.1274 23.5783 21.5722ZM5.10136 16.0289C2.09016 13.0177 2.09051 8.11794 5.10136 5.1064C6.56009 3.64802 8.49973 2.84453 10.5626 2.84453C12.6259 2.84453 14.5652 3.64802 16.0239 5.1064C17.4826 6.56512 18.2861 8.50476 18.2861 10.5677C18.2861 12.6309 17.4826 14.5702 16.0239 16.0289C14.5652 17.4877 12.6259 18.2912 10.5626 18.2912C8.49973 18.2912 6.56009 17.4877 5.10136 16.0289Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Search and Title End */}

      {/* Table Start  */}
      <div className="max-1440:overflow-auto   px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-auc-primary-color-300">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="text-[18px] text-center capitalize leading-[120%] border py-[19px] text-auc-primary-color"
                >
                  {t(head)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table_data && table_data.length > 0 ? (
              table_data.map((item, index) => {
                const tdStyle =
                  "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";

                return (
                  <tr key={index}>
                    <td className={`${tdStyle} w-[83px] !mx-[0px]`}>
                      {`${index <= 8 ? "0" : ""}${index + 1}`}
                    </td>
                    <td className={`${tdStyle} w-[177px]`}>{item.trx}</td>
                    <td className={`${tdStyle} w-[142px]`}>
                      {c(item.total_amount)} {" "}
                      {symbol && symbol}
                    </td>
                    <td className={`${tdStyle} w-[148px]`}>
                      <p
                        className={`w-[100px] h-[40px] flex items-center justify-center  rounded-[4px] mx-auto  text-[16px] 
                        ${
                          item.status === "pending" ||
                          (item.status === 0 && "bg-auc-secondary-color-700")
                        }
                        ${
                          item.status === "complete" ||
                          (item.status === 1 &&
                            "bg-auc-primary-color text-auc-white-color")
                        }
                        ${
                          item.status === "rejected" ||
                          (item.status === 2 &&
                            "bg-auc-light-red-color text-auc-white-color")
                        }
                      `}
                      >
                        {showStatus(item.status)}
                      </p>
                    </td>
                    <td className={`${tdStyle} w-[164px]`}>
                      {item.update_created_at}
                    </td>
                    <td
                      className={`${`${tdStyle} `} flex items-center justify-center gap-[12px]`}
                    >
                      {/* View button  */}
                      <IconButton
                        styles={"auc-icon-btn-primary"}
                        clickHandler={() => handleModalWithId(item.trx)}
                        svg={
                          <svg
                            className="mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1595_1756)">
                              <path
                                d="M12 4.84692C7.41454 4.84692 3.25621 7.35567 0.187788 11.4305C-0.0625959 11.7644 -0.0625959 12.2308 0.187788 12.5646C3.25621 16.6444 7.41454 19.1532 12 19.1532C16.5855 19.1532 20.7438 16.6444 23.8122 12.5695C24.0626 12.2357 24.0626 11.7693 23.8122 11.4354C20.7438 7.35567 16.5855 4.84692 12 4.84692ZM12.3289 17.0372C9.28506 17.2286 6.7714 14.7199 6.96287 11.6711C7.11998 9.15745 9.15741 7.12001 11.6711 6.96291C14.7149 6.77144 17.2286 9.28019 17.0371 12.329C16.8751 14.8377 14.8377 16.8752 12.3289 17.0372ZM12.1767 14.7101C10.537 14.8132 9.18196 13.4631 9.28997 11.8233C9.37343 10.4683 10.4732 9.37347 11.8282 9.2851C13.4679 9.182 14.823 10.5321 14.7149 12.1719C14.6266 13.5318 13.5268 14.6266 12.1767 14.7101Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1595_1756">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="block py-4 border capitalize">
                    no data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Table Endd  */}
      <WithdrawModal
        page_data={modalData}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default WithdrawLogsTable;
