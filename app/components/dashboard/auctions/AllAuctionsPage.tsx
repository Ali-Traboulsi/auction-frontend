"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import Auctions from "../../../components/dashboard/auctions/Auctions";
import Cookies from "js-cookie";
import Pagination from "../../../components/pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

const AllAuctionsPage = () => {
  const [allAuctionData, setallAuctionData] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setpaginationInfo] = useState(null);
  const [loading, setloading] = useState(false);
  const token = Cookies.get("user_token");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchProduct = searchParams.get("name")?.toString() || "";

  // handle search params
  const handleSearchField = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("name", value);
      } else {
        params.delete("name");
      }
      router.push(value ? `${pathname}?${params.toString()}` : pathname);
    },
    [router, pathname, searchParams]
  );

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

  const fetchAllAuctionData = useCallback(
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
        `${process.env.API_BASE_URL}/api/user/all-auction?name=${searchProduct}&page=${pageNumber}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status === true || 200) {
            setallAuctionData(res?.data?.auctions?.data);
            setpaginationInfo(res?.data?.auctions?.meta);
          }
          setloading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
        });
    },
    [token, searchProduct]
  );

  useEffect(() => {
    fetchAllAuctionData(page);
  }, [page, fetchAllAuctionData]);

  const title = "All Auctions";

  if (loading) return <TableSkeleton />;

  return (
    <Suspense fallback={<TableSkeleton />}>
      <div>
        <Auctions
          table_data={allAuctionData}
          title={title}
          handleSearchField={handleSearchField}
          defaultSearchInput={searchProduct}
        />

        <Pagination
          current_page={paginationInfo?.current_page}
          links={paginationInfo?.links}
          per_page={paginationInfo?.per_page}
          total_items={paginationInfo?.total}
          handlePageCount={handlePageCount}
        />
      </div>
    </Suspense>
  );
};

export default AllAuctionsPage;
