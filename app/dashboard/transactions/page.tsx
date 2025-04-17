"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NiceSelect from "../../components/NiceSelect/NiceSelect";
import Transactions from "../../components/dashboard/transactions/Transactions";
import Cookies from "js-cookie";
import Pagination from "../../components/pagination/Pagination";
import useLanguage from "../../hook/UseLanguage";
import { TableSkeleton } from "../../components/skeleton/skeleton";

const TransectionList = () => {
  const [transections, setTransections] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState(null);
  const [loading, setloading] = useState(false);
  const [productNumber, setproductNumber] = useState("");
  const [remarkQuery, setremarkQuery] = useState("any");
  const [remarkList, setremarkList] = useState([]);

  const t = useLanguage();

  const token = Cookies.get("user_token");

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

  const fetchTransectionData = (pageNumber) => {
    setloading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };

    let search_remark_query = remarkQuery === "any" ? "" : remarkQuery;

    fetch(
      `${process.env.API_BASE_URL}/api/user/transactions?page=${pageNumber}&trnx=${productNumber}&remark=${search_remark_query}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true || 200) {
          setTransections(res.data.transactions.data);
          setlastPage(res.data.transactions.last_page);
          setperPage(res.data.transactions.per_page);
          setcurrentPage(res.data.transactions.current_page);
          setPageLinks(res.data.transactions.links);
          setremarkList(res.data.remark_list);
          settotalItems(res.data.transactions.total);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchTransectionData(page);
  }, [page]);

  if (loading) return <TableSkeleton />;
  return (
    <Suspense fallback={<TableSkeleton />}>
      <div>
        <h2 className="auc-primary-heading">{t("Transactions")}</h2>
        <div className="flex flex-wrap min-1200:flex-nowrap items-end gap-[28px] min-768:gap-[4%] min-1200:gap-[28px] mb-[28px]">
          {/* Transaction Number */}
          <div className="w-full min-768:w-[48%] min-1440:w-[263px]">
            <label htmlFor="product-name">{t("Transaction ID")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="name"
              autoComplete="off"
              name="product-name"
              id="product-name"
              value={productNumber}
              placeholder="Transaction ID"
              onChange={(e) => setproductNumber(e.target.value)}
            />
          </div>

          {/* Remark */}
          <div className="w-full min-768:w-[48%] min-1440:w-[212px]">
            <label htmlFor="product-name"> {t("Remark")}</label>
            <div className="relative mt-[16px]">
              <NiceSelect
                options={remarkList}
                defaultValue={remarkQuery}
                onChange={(value: any) => {
                  setremarkQuery(value.value);
                }}
                wrapperClass=""
              />
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchTransectionData(page);
            }}
            type="button"
            className="flex items-center justify-center gap-[8px] w-full px-[40px] py-[18px] min-768:w-[48%] min-1440:w-[157px] h-[60px] rounded-[8px] bg-auc-primary-color hover:bg-auc-primary-hover-color transition-all ease-in-out duration-300 text-auc-white-color text-[18px] leading-[120%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <path
                d="M16 3C16 2.40666 16.1759 1.82664 16.5056 1.33329C16.8352 0.839943 17.3038 0.455426 17.8519 0.228363C18.4001 0.00129986 19.0033 -0.0581102 19.5853 0.0576455C20.1672 0.173401 20.7018 0.459124 21.1213 0.878681C21.5409 1.29824 21.8266 1.83279 21.9424 2.41473C22.0581 2.99667 21.9987 3.59987 21.7716 4.14805C21.5446 4.69623 21.1601 5.16477 20.6667 5.49441C20.1734 5.82405 19.5933 6 19 6C18.2044 6 17.4413 5.68393 16.8787 5.12132C16.3161 4.55871 16 3.79565 16 3ZM1 4H13C13.2652 4 13.5196 3.89464 13.7071 3.70711C13.8946 3.51957 14 3.26522 14 3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3C0 3.26522 0.105357 3.51957 0.292893 3.70711C0.48043 3.89464 0.734784 4 1 4ZM7 7C6.38106 7.00174 5.7778 7.19488 5.27293 7.55294C4.76807 7.911 4.38631 8.41645 4.18 9H1C0.734784 9 0.48043 9.10536 0.292893 9.29289C0.105357 9.48043 0 9.73478 0 10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8946 0.734784 11 1 11H4.18C4.36345 11.5189 4.6861 11.9773 5.11264 12.3251C5.53918 12.6729 6.05317 12.8966 6.59836 12.9718C7.14355 13.0471 7.69893 12.9709 8.20371 12.7516C8.70849 12.5323 9.14323 12.1784 9.46035 11.7286C9.77746 11.2788 9.96473 10.7504 10.0017 10.2013C10.0386 9.65219 9.92376 9.1035 9.66973 8.61528C9.41571 8.12706 9.03227 7.71812 8.5614 7.43323C8.09052 7.14833 7.55035 6.99846 7 7ZM21 9H13C12.7348 9 12.4804 9.10536 12.2929 9.29289C12.1054 9.48043 12 9.73478 12 10C12 10.2652 12.1054 10.5196 12.2929 10.7071C12.4804 10.8946 12.7348 11 13 11H21C21.2652 11 21.5196 10.8946 21.7071 10.7071C21.8946 10.5196 22 10.2652 22 10C22 9.73478 21.8946 9.48043 21.7071 9.29289C21.5196 9.10536 21.2652 9 21 9ZM9 16H1C0.734784 16 0.48043 16.1054 0.292893 16.2929C0.105357 16.4804 0 16.7348 0 17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H9C9.26522 18 9.51957 17.8946 9.70711 17.7071C9.89464 17.5196 10 17.2652 10 17C10 16.7348 9.89464 16.4804 9.70711 16.2929C9.51957 16.1054 9.26522 16 9 16ZM21 16H17.82C17.5841 15.3328 17.1199 14.7704 16.5095 14.4124C15.8991 14.0543 15.1818 13.9235 14.4843 14.0432C13.7868 14.1629 13.154 14.5253 12.6979 15.0663C12.2418 15.6074 11.9916 16.2923 11.9916 17C11.9916 17.7077 12.2418 18.3926 12.6979 18.9337C13.154 19.4747 13.7868 19.8371 14.4843 19.9568C15.1818 20.0765 15.8991 19.9457 16.5095 19.5876C17.1199 19.2296 17.5841 18.6672 17.82 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16Z"
                fill="white"
              />
            </svg>
            {t("Filters")}
          </button>
        </div>
        <Transactions
          main_transection={true}
          transections_data={transections}
          limit={10}
        />
        <Pagination
          current_page={currentPage}
          links={pageLinks}
          total_items={totalItems}
          per_page={perPage}
          handlePageCount={handlePageCount}
        />
      </div>
    </Suspense>
  );
};

export default TransectionList;
