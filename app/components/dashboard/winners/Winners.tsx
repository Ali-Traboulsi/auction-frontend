"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "../../buttons/IconButton";
import Pagination from "../../pagination/Pagination";
import Cookies from "js-cookie";
import TransactionsDetailsCard from "../../cards/TransactionsDetailsCard";
import useLanguage from "../../../hook/UseLanguage";
import { TableSkeleton } from "../../skeleton/skeleton";

const TABLE_HEAD = [
  "S.N.",
  "Winner Name",
  "Product Name",
  "Bidding Date",
  "Status",
  "Action",
];

const Winners = () => {
  const [allAuctionData, setallAuctionData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [totalItems, settotalItems] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [activeModalId, setactiveModalId] = useState(null);
  const token = Cookies.get("user_token");
  const router = useRouter();
  const t = useLanguage();



  const handleOpenModal = () => setOpenModal(!openModal);

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

  // fetch winning data
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
        `${process.env.API_BASE_URL}/api/user/winners?page=${pageNumber}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status === 200) {
            setallAuctionData(res.data.winners.data);
            setlastPage(res.data.winners.meta.last_page);
            setperPage(res.data.winners.meta.per_page);
            setcurrentPage(res.data.winners.meta.current_page);
            setPageLinks(res.data.winners.meta.links);
            settotalItems(res.data.winners.meta.total);
          }
          if (res.status === 401) {
            Cookies.remove("user_token");
            router.replace("/login");
            router.refresh();
          }
          setloading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
        });
    },
    [router, token]
  );

  // fetch winning modal data
  function getModalData(bid_id) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/winner-details/${bid_id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        } else {
          setModalData(data.data.user);
          setOpenModal(true);
        }
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

  useEffect(() => {
    fetchAllAuctionData(page);
  }, [page, fetchAllAuctionData]);

  if (loading) return <TableSkeleton />;

  return (
    <>
      {/* Search and Title Start */}
      <div className="auc-primary-heading-container">
        <h2 className="">{t("All Winners")}</h2>
    
      </div>
      {/* Search and Title End */}
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
            {allAuctionData && allAuctionData.length > 0 ? (
              allAuctionData.map((item, index) => {
                const tdStyle =
                  "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";

                return (
                  <tr key={index}>
                    <td className={`${tdStyle} `}>
                      {`${index <= 8 ? "0" : ""}${index + 1}`}
                    </td>
                    <td className={`${tdStyle} w-[168px] !text-left`}>
                      {item.auction_winner} {item.id}
                    </td>
                    <td className={`${tdStyle} w-[200px] !text-left`}>
                      {item.product_name}
                    </td>
                    <td className={`${tdStyle} w-[164px]`}>{item.bid_date}</td>
                    <td className={`${tdStyle}`}>
                      <p
                        className={`w-[100px] h-[40px] rounded-[4px] mx-auto text-[16px] flex items-center justify-center
                            ${
                              item.delivery_status === "Pending" &&
                              "bg-auc-secondary-color-700"
                            }
                            ${
                              item.delivery_status === "Delivered" &&
                              "bg-auc-light-green-color text-auc-white-color"
                            }
                            
                          `}
                      >
                        {t(item.delivery_status)}
                      </p>
                    </td>
                    <td
                      className={`${tdStyle} flex items-center justify-end gap-[12px]`}
                    >
                      {/* View button  */}
                      <IconButton
                        styles={"auc-icon-btn-primary"}
                        // clickHandler={handleOpenModal}
                        clickHandler={() => handleModalWithId(item.winner_id)}
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
      {/* Pagination  */}
      <Pagination
          current_page={currentPage}
          links={pageLinks}
          total_items={totalItems}
          per_page={perPage}
          handlePageCount={handlePageCount}
        />
      {/* Modal  */}
      <TransactionsDetailsCard
        name={modalData?.name}
        phone={modalData?.phone}
        email={modalData?.email}
        address={modalData?.address}
        zip={modalData?.zip}
        city={modalData?.city}
        country={modalData?.country}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default Winners;
