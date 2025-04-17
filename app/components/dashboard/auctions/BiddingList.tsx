"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pagination from "../../pagination/Pagination";
import useCurrency from "../../../hook/UseCurrency";
import useCurrencySymbol from "../../../hook/UseCurrencySymbol";

const BiddingList = ({ tableHead, bid_id }) => {
  const [allAuctionBiddingList, setallAuctionBiddingList] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setpaginationInfo] = useState(null);
  const [loading, setloading] = useState(false);
  const token = Cookies.get("user_token");

  const c = useCurrency();
  const symbol = useCurrencySymbol();

  const fetchAllBiddingListData = (pageNumber) => {
    setloading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/auction/bid/${bid_id}?page=${pageNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true || 200) {
          setallAuctionBiddingList(res?.data?.bids?.data);
          setpaginationInfo(res?.data?.bids?.meta);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  const handlePageCount = (pg) => {
    if (pg === "&laquo; Previous") {
      if (paginationInfo?.current_page !== 1) {
        setPage(pg - 1);
      }
    } else if (pg === "Next &raquo;") {
      if (paginationInfo?.current_page !== pg) {
        setPage(pg + 1);
      }
    } else {
      setPage(pg);
    }
  };

  useEffect(() => {
    fetchAllBiddingListData(page);
  }, [page]);

  const thDataStyle =
    "text-[18px] text-center capitalize leading-[120%] border px-[24px] py-[19px] text-auc-primary-color";
  const tdStyle =
    "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";
  return (
    <div className="max-1440:overflow-auto   px-0">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="bg-auc-primary-color-300">
            {tableHead.map((head) => (
              <th key={head} className={thDataStyle}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allAuctionBiddingList && allAuctionBiddingList.length > 0 ? (
            allAuctionBiddingList.map((item, index) => {
              return (
                <tr key={index}>
                  <td className={`${tdStyle} w-[83px]`}>
                    {`${index <= 8 ? "0" : ""}${index + 1}`}
                  </td>
                  <td className={`${tdStyle} w-[150px] !text-left`}>
                    {item.bidder}
                  </td>
                  <td className={`${tdStyle} w-[200px] !text-left`}>
                    {item.product_name}
                  </td>
                  <td className={tdStyle}>
                    {symbol}   {c(item.product_price)}
                    <br />
                  </td>
                  <td className={tdStyle}>
                    {symbol}  {c(item.bid_amount)}
                    <br />
                  </td>
                  <td className={`${tdStyle} w-[145px]`}>{item.bid_date}</td>
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

      {allAuctionBiddingList && allAuctionBiddingList.length > 0 && (
        <Pagination
          current_page={paginationInfo?.current_page}
          links={paginationInfo?.links}
          per_page={paginationInfo?.per_page}
          total_items={paginationInfo?.total}
          handlePageCount={handlePageCount}
        />
      )}
    </div>
  );
};

export default BiddingList;
