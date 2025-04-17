"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import TicketsTable from "../../components/dashboard/tickets/TicketsTable";
import Cookies from "js-cookie";
import useLanguage from "../../hook/UseLanguage";
import { TableSkeleton } from "../../components/skeleton/skeleton";

const AllTickets = () => {
  const [allTickets, setallTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalItems, settotalItems] = useState(null);
  const token = Cookies.get("user_token");
  const t = useLanguage();

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

  const fetchallTickets = (pageNumber) => {
    setloading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/support/tickets?page=${pageNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true || 200) {
          setallTickets(res.data.tickets.data);
          setlastPage(res.data.tickets.last_page);
          setperPage(res.data.tickets.per_page);
          setcurrentPage(res.data.tickets.current_page);
          setPageLinks(res.data.tickets.links);
          settotalItems(res.data.tickets.total);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchallTickets(page);
  }, [page]);

  if (loading) return <TableSkeleton />;

  return (
    <>
      <div className="auc-primary-heading-container">
        <h2>{t("Support Tickets")}</h2>
        <Link
          href="/dashboard/tickets/create-tickets"
          className="flex items-center justify-center h-[56px] px-[40px] rounded-[8px] py-[16px] bg-auc-primary-color hover:bg-auc-primary-hover-color transition-all ease-in-out duration-300 text-[18px] leading-[120%] text-auc-white-color"
        >
          + {t("Create New Ticket")}
        </Link>
      </div>
      {allTickets && <TicketsTable table_data={allTickets} />}

      {allTickets && (
           <Pagination
           current_page={currentPage}
           links={pageLinks}
           total_items={totalItems}
           per_page={perPage}
           handlePageCount={handlePageCount}
         />
      )}
    </>
  );
};

export default AllTickets;
