"use client";

import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import ProductDetailsCard from "../cards/ProductDetailsCard";
import IconButton from "../buttons/IconButton";
import { IDashBTable } from "../../interfaces/interfaces";
// import delay from "delay";
import Cookies from "js-cookie";
import useLanguage from "../../hook/UseLanguage";
import useCurrency from "../../hook/UseCurrency";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";

const DashBTable: React.FC<IDashBTable> = ({
  tableHead,
  tableData,
  bid_for,
}) => {
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  const [openModal, setOpenModal] = useState(false);
  const [activeModalId, setactiveModalId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const client_token = Cookies.get("user_token");

  const handleOpenModal = () => setOpenModal(!openModal);

  // fetch bid modal data
  function getDashboardModalBidHistoryData(bid_id) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${client_token}`,
      },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/bid/details/${bid_id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setModalData(data);
        setOpenModal(true);
      })
      .catch((err) => {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      });
  }

  // fetch winners modal data
  function getDashboardModalWinHistoryData(bid_id) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${client_token}`,
      },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/winning/details/${bid_id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setModalData(data);
        setOpenModal(true);
      })
      .catch((err) => {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      });
  }

  const handleModalWithId = (id) => {
    setactiveModalId(id);
    if (bid_for === "bid") {
      getDashboardModalBidHistoryData(id);
    } else {
      getDashboardModalWinHistoryData(id);
    }
  };

  const thDataStyle =
    "text-[18px] text-center capitalize leading-[120%] border px-[24px] py-[19px] text-auc-primary-color";
  const tdStyle =
    "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";

  return (
    <>
      <div className="max-1440:overflow-auto   px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-auc-primary-color-300">
              {tableHead.map((head) => (
                <th key={head} className={thDataStyle}>
                  {t(head)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 ? (
              tableData.map((td, index) => {
                return (
                  <tr key={index}>
                    <td className={`${tdStyle} `}>
                      {`${index <= 8 ? "0" : ""}${index + 1}`}
                    </td>
                    <td className={`${tdStyle} w-[200px] !text-left`}>
                      {td.product_name}
                    </td>
                    <td className={`${tdStyle} w-[170px] !px-[40px]`}>
                      {symbol} {c(td.product_price)}
                    </td>
                    <td className={`${tdStyle} w-[170px] !px-[40px]`}>
                      {symbol} {c(td.bid_amount)}
                    </td>
                    <td className={`${tdStyle} w-[170px]`}>{td.bid_date}</td>
                    <td
                      className={`${tdStyle} flex items-center justify-center gap-[12px] `}
                    >
                      {/* View button  */}
                      <IconButton
                        styles={"auc-icon-btn-primary"}
                        clickHandler={() => handleModalWithId(td.id)}
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
      {/* pagination  */}
      {/* <Pagination /> */}
      {/* Modal  */}
      {bid_for === "bid" ? (
        <ProductDetailsCard
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          bidding_id={activeModalId}
          modal_data={modalData}
          product_img={modalData && modalData?.data.bid_image}
          product_name={modalData && modalData?.data.product_name}
          product_owner={modalData && modalData?.data.auction_owner}
          product_price={modalData && modalData?.data.auction_price}
          product_slug={modalData && modalData?.data.slug}
        />
      ) : (
        <ProductDetailsCard
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          bidding_id={activeModalId}
          modal_data={modalData}
          product_img={modalData && modalData?.data.winners.image}
          product_name={modalData && modalData?.data.winners.product_name}
          product_owner={modalData && modalData?.data.winners.auction_owner}
          product_price={modalData && modalData?.data.winners.bid_amount}
          product_slug={modalData && modalData?.data.winners.slug}
        />
      )}
    </>
  );
};

export default DashBTable;
