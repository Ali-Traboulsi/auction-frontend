"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import DepositLogsTable from "../../../components/dashboard/logs/DepositLogsTable";
import { depositHistoryData } from "../../../components/dashboard/logs/Data";
import Pagination from "../../../components/pagination/Pagination";
import Cookies from "js-cookie";
import { TableSkeleton } from "../../../components/skeleton/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DepositLogs = () => {
  const [depositLogs, setdepositLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [totalItems, settotalItems] = useState(null);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setloading] = useState(false);

  const token = Cookies.get("user_token");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchProduct = searchParams.get("transaction_id")?.toString() || "";

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

  const fetchDepositLogs = useCallback(
    (pageNumber) => {
      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      };

      fetch(
        `${process.env.API_BASE_URL}/api/user/deposit/history?transaction_id=${searchProduct}&page=${pageNumber}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status === true || 200) {
            setdepositLogs(res.data.deposits.data);
            setlastPage(res.data.deposits.last_page);
            setperPage(res.data.deposits.per_page);
            setcurrentPage(res.data.deposits.current_page);
            settotalItems(res.data.deposits.total);
            setPageLinks(res.data.deposits.links);
          }
          setloading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
        });
    },
    [searchProduct, token]
  );

  // handle search params
  const handleSearchField = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("transaction_id", value);
      } else {
        params.delete("transaction_id");
      }
      router.push(value ? `${pathname}?${params.toString()}` : pathname);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    fetchDepositLogs(page);
  }, [page, fetchDepositLogs]);

  const title = "Deposit History";

  if (loading) return <TableSkeleton />;
  return (
    <>
      <Suspense fallback={<TableSkeleton />}>
        <DepositLogsTable
          title={title}
          table_data={depositLogs}
          handleSearchField={handleSearchField}
          defaultSearchInput={searchProduct}
        />

        <Pagination
          current_page={currentPage}
          links={pageLinks}
          total_items={totalItems}
          per_page={perPage}
          handlePageCount={handlePageCount}
        />
      </Suspense>
    </>
  );
};

export default DepositLogs;
