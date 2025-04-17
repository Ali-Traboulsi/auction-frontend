"use client";

import React, { useEffect, useState } from "react";
import ProductDetailsCard from "../../cards/ProductDetailsCard";
import RemoveModalCard from "../../cards/RemoveModalCard";
import IconButton from "../../buttons/IconButton";
import { IWishlistsTable } from "../../../interfaces/interfaces";
import Pagination from "../../pagination/Pagination";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useLanguage from "../../../hook/UseLanguage";
import { TableSkeleton } from "../../skeleton/skeleton";
import useCurrency from "../../../hook/UseCurrency";
import useCurrencySymbol from "../../../hook/UseCurrencySymbol";
import { truncateString } from "../../../helpers/helpers";

const WishlistsTable: React.FC<IWishlistsTable> = ({
  tableHead,
  tableData,
}) => {
  const [allWishListData, setallWishListData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [totalItems, settotalItems] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [activeRemoveId, setactiveRemoveId] = useState(null);

  const token = Cookies.get("user_token");
  const router = useRouter();
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

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

  const fetchallWishListData = (pageNumber) => {
    setloading(true);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/wishlist?page=${pageNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status === true || 200) {
          setallWishListData(res.wishlists.data);
          setlastPage(res.wishlists.meta.last_page);
          setperPage(res.wishlists.meta.per_page);
          setcurrentPage(res.wishlists.meta.current_page);
          setPageLinks(res.wishlists.meta.links);
          settotalItems(res.wishlists.meta.total);
        }
        if (res.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  // remove wishlist api
  const handleRemoveWishlit = () => {
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setloading(true);
    fetch(
      `${process.env.API_BASE_URL}/api/user/wishlist/remove/${activeRemoveId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === true || 200) {
          fetchallWishListData(page);
          toast.success("Wishlist deleted Successfully!");
        }
        setloading(false);
        setOpenRemoveModal(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
        setOpenRemoveModal(false);
      });
  };

  useEffect(() => {
    fetchallWishListData(page);
  }, [page]);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const handleOpenRemoveModal = () => setOpenRemoveModal(!openRemoveModal);

  // handle modal and active id
  const handleModalAndSetId = (id) => {
    setOpenRemoveModal(true);
    setactiveRemoveId(id);
  };

  const thDataStyle =
    "text-[18px] text-center capitalize leading-[120%] border py-[19px] text-auc-primary-color";
  const tdStyle =
    "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";

  if (loading) return <TableSkeleton />;

  return (
    <>
      <div className=" max-1440:overflow-auto   px-0">
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
            {allWishListData && allWishListData.length > 0 ? (
              allWishListData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className={`${tdStyle} w-[83px] !px-[0px]`}>
                      {`${index <= 8 ? "0" : ""}${index + 1}`}
                    </td>
                    <td className={`${tdStyle} !text-left w-[200px]`}>
                      {truncateString(item.product_name,25)}
                    </td>
                    <td className={tdStyle}>
                      {symbol} {c(item.product_price)}
                      <br />
                    </td>
                    <td className={tdStyle}>
                      {symbol} {c(item.highest_bid)}
                      <br />
                    </td>
                    <td className={`${tdStyle}`}>{item.time_left}</td>
                    <td
                      className={`${tdStyle} flex justify-end gap-[12px]`}
                    >
                      {/* delete button  */}
                      <IconButton
                        styles={"auc-icon-btn-secondary"}
                        clickHandler={() => handleModalAndSetId(item.id)}
                        svg={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mx-auto"
                          >
                            <g clipPath="url(#clip0_1990_558)">
                              <path
                                d="M22.8 3.6001H1.2C0.88174 3.6001 0.576515 3.72653 0.351472 3.95157C0.126428 4.17661 0 4.48184 0 4.8001C0 5.11836 0.126428 5.42358 0.351472 5.64863C0.576515 5.87367 0.88174 6.0001 1.2 6.0001H3.6V20.4001C3.60029 21.3548 3.97966 22.2703 4.65473 22.9454C5.3298 23.6204 6.24531 23.9998 7.2 24.0001H16.8C17.7547 23.9998 18.6702 23.6205 19.3453 22.9454C20.0204 22.2703 20.3997 21.3548 20.4 20.4001V6.0001H22.8C23.1183 6.0001 23.4235 5.87367 23.6485 5.64863C23.8736 5.42358 24 5.11836 24 4.8001C24 4.48184 23.8736 4.17661 23.6485 3.95157C23.4235 3.72653 23.1183 3.6001 22.8 3.6001ZM10.8 16.8001C10.8 17.1184 10.6736 17.4236 10.4485 17.6486C10.2235 17.8737 9.91826 18.0001 9.6 18.0001C9.28174 18.0001 8.97652 17.8737 8.75147 17.6486C8.52643 17.4236 8.4 17.1184 8.4 16.8001V10.8001C8.4 10.4818 8.52643 10.1766 8.75147 9.95157C8.97652 9.72653 9.28174 9.6001 9.6 9.6001C9.91826 9.6001 10.2235 9.72653 10.4485 9.95157C10.6736 10.1766 10.8 10.4818 10.8 10.8001V16.8001ZM15.6 16.8001C15.6 17.1184 15.4736 17.4236 15.2485 17.6486C15.0235 17.8737 14.7183 18.0001 14.4 18.0001C14.0817 18.0001 13.7765 17.8737 13.5515 17.6486C13.3264 17.4236 13.2 17.1184 13.2 16.8001V10.8001C13.2 10.4818 13.3264 10.1766 13.5515 9.95157C13.7765 9.72653 14.0817 9.6001 14.4 9.6001C14.7183 9.6001 15.0235 9.72653 15.2485 9.95157C15.4736 10.1766 15.6 10.4818 15.6 10.8001V16.8001Z"
                                fill="white"
                              />
                              <path
                                d="M9.6 2.4H14.4C14.7183 2.4 15.0235 2.27357 15.2485 2.04853C15.4736 1.82348 15.6 1.51826 15.6 1.2C15.6 0.88174 15.4736 0.576515 15.2485 0.351472C15.0235 0.126428 14.7183 0 14.4 0H9.6C9.28174 0 8.97652 0.126428 8.75147 0.351472C8.52643 0.576515 8.4 0.88174 8.4 1.2C8.4 1.51826 8.52643 1.82348 8.75147 2.04853C8.97652 2.27357 9.28174 2.4 9.6 2.4Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1990_558">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        }
                      />
                      {/* View button  */}
                      <IconButton
                        isLink={true}
                        href={`/product/details/${item.slug}`}
                        styles={"auc-icon-btn-primary"}
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

      {/* <Pagination /> */}
      <Pagination
          current_page={currentPage}
          links={pageLinks}
          total_items={totalItems}
          per_page={perPage}
          handlePageCount={handlePageCount}
        />

      {/* Remove Modal  */}
      <RemoveModalCard
        openRemoveModal={openRemoveModal}
        handleOpenRemoveModal={handleOpenRemoveModal}
        title={"Remove from wishlist"}
        handleRemove={handleRemoveWishlit}
        confirmationText={
          "Are you sure you want to remove this item from wishlist?"
        }
        remove_btn_text={"Remove From Wishlist"}
      />
    </>
  );
};

export default WishlistsTable;
