"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import WithdrawLogsTable from "../../../components/dashboard/logs/WithdrawLogsTable";
import Pagination from "../../../components/pagination/Pagination";
import Cookies from "js-cookie";
import { TableSkeleton } from "../../../components/skeleton/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Log = () => {
  const [withdrawLogs, setwithdrawLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState(null);
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

  const fetchWithdrawLogs = useCallback(
    (pageNumber) => {
      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      };

      fetch(
        `${process.env.API_BASE_URL}/api/user/withdraw-history?transaction_id=${searchProduct}&page=${pageNumber}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status === true || 200) {
            setwithdrawLogs(res.data.data);
            setlastPage(res.data.last_page);
            setperPage(res.data.per_page);
            setcurrentPage(res.data.current_page);
            setPageLinks(res.data.links);
            settotalItems(res.data.total);
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
    fetchWithdrawLogs(page);
  }, [page, fetchWithdrawLogs]);
  const title = "Withdraw History";

  if (loading) return <TableSkeleton />;
  return (
    <Suspense>
      <div>
        <WithdrawLogsTable
          title={title}
          table_data={withdrawLogs}
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
      </div>
    </Suspense>
  );
};

export default Log;
