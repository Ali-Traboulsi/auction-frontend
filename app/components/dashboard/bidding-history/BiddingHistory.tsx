"use client";
import React, { useState, useEffect } from "react";
import DashBTable from "../DashBTable";
import Cookies from "js-cookie";
import TitleBoxTwo from "../../TitleBoxTwo";
import Pagination from "../../pagination/Pagination";

const BiddingHistory =  () => {
  const [bidHistory, setBidHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setpaginationInfo] = useState(null);
  const [loading, setloading] = useState(false);

  const token = Cookies.get("user_token");

  const fetchBiddingHistory = (pageNumber) => {
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/bid/history?page=${pageNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true || 200) {
          setBidHistory(res.data.bids.data);
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
    fetchBiddingHistory(page);
  }, [page]);

  const tableHead = [
    "S.N.",
    "Product Name",
    "Product Price",
    "Bid Price",
    "Bid Date",
    "View",
  ];

  return (
    <div>
      <TitleBoxTwo
        cls="auc-primary-heading"
        delay="0.0s"
        title="Bidding History"
      />

      <DashBTable bid_for="bid" tableHead={tableHead} tableData={bidHistory} />

 
      <Pagination
          current_page={paginationInfo?.current_page}
          links={paginationInfo?.links}
          per_page={paginationInfo?.per_page}
          total_items={paginationInfo?.total}
          handlePageCount={handlePageCount}
        />
    </div>
  );
};

export default BiddingHistory;
