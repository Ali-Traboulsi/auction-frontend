"use client";
import React, { useState, useEffect } from "react";
import DashBTable from "../DashBTable";
import Pagination from "../../pagination/Pagination";
import Cookies from "js-cookie";
import TitleBoxTwo from "../../TitleBoxTwo";

const WinningHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState(null);
  const [loading, setloading] = useState(false);

  const token = Cookies.get("user_token");

  const fetchHistoryData = (pageNumber) => {
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/winning/history?page=${pageNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true || 200) {
          setHistoryData(res.data.winners.data);
          setlastPage(res.data.winners.meta.last_page);
          setperPage(res.data.winners.meta.per_page);
          setcurrentPage(res.data.winners.meta.current_page);
          setPageLinks(res.data.winners.meta.links);
          settotalItems(res.data.winners.meta.total);
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
      if (currentPage !== 1) {
        setPage(pg - 1);
      }
    } else if (pg === "Next &raquo;") {
      if (lastPage !== pg) {
        setPage(pg + 1);
      }
    } else {
      setPage(pg);
    }
  };

  useEffect(() => {
    fetchHistoryData(page);
  }, [page]);

  const tableHead = [
    "S.N.",
    "Product Name",
    "Product Price",
    "Bid Price",
    "Bid Time",
    "View",
  ];

  return (
    <>
      <TitleBoxTwo
        cls="auc-primary-heading"
        delay="0.1s"
        title="Winning History"
      />
      <DashBTable bid_for="win" tableHead={tableHead} tableData={historyData} />
      <Pagination
          current_page={currentPage}
          links={pageLinks}
          total_items={totalItems}
          per_page={perPage}
          handlePageCount={handlePageCount}
        />
    </>
  );
};

export default WinningHistory;
