"use client";

import React, { useEffect, useState } from "react";
// import Link from "next/link";
import IconButton from "../../buttons/IconButton";
import { IAuctions } from "../../../interfaces/interfaces";
import useLanguage from "../../../hook/UseLanguage";
import useCurrency from "../../../hook/UseCurrency";
import useCurrencySymbol from "../../../hook/UseCurrencySymbol";
// import { toast } from "react-toastify";

const TABLE_HEAD = [
  "S.N.",
  "Product Name",
  "Product Price",
  "Bidder",
  "Status",
  "Action",
];

const Auctions: React.FC<IAuctions> = ({
  table_data,
  title,
  handleSearchField,
  defaultSearchInput,
}) => {
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();
  const [searchInput, setSearchInput] = useState(defaultSearchInput);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchField(searchInput);
  };

  return (
    <>
      {/* Search and Title Start */}
      <div className="auc-primary-heading-container">
        <h2>{t(title)}</h2>
        <div className="w-full min-768:w-[250px] min-1440:w-[333px] ">
          {/* Search */}
          <form onSubmit={handleSearchSubmit}>
            <div className="w-full flex items-center">
              <input
                className="relative z-10 left-[5px] flex outline-auc-primary-color justify-center items-center gap-[10px] border border-auc-border-color px-[16px] py-[19px] w-full h-[60px] rounded-l-[8px]"
                type="text"
                autoComplete="off"
                name="search"
                defaultValue={searchInput}
                id="search"
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search By Product Name"
              />
              <button
                type="submit"
                className="flex w-[60px] p-[18px] items-start gap-[10px] rounded-r-[8px] bg-auc-primary-color hover:bg-auc-primary-hover-color transition-all ease-in-out duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M23.5783 21.5722L18.9657 16.9596C20.3637 15.1296 21.1303 12.9099 21.1306 10.5677C21.1306 7.74502 20.0313 5.09112 18.0351 3.09523C16.0392 1.09934 13.3856 0 10.5626 0C7.73998 0 5.08608 1.09934 3.09019 3.09523C-1.03006 7.21583 -1.03006 13.9202 3.09019 18.0401C5.08608 20.0363 7.73998 21.1357 10.5626 21.1357C12.9049 21.1354 15.1246 20.3687 16.9546 18.9708L21.5671 23.5833C21.8446 23.8611 22.2088 24 22.5727 24C22.9366 24 23.3008 23.8611 23.5783 23.5833C24.1339 23.0281 24.1339 22.1274 23.5783 21.5722ZM5.10136 16.0289C2.09016 13.0177 2.09051 8.11794 5.10136 5.1064C6.56009 3.64802 8.49973 2.84453 10.5626 2.84453C12.6259 2.84453 14.5652 3.64802 16.0239 5.1064C17.4826 6.56512 18.2861 8.50476 18.2861 10.5677C18.2861 12.6309 17.4826 14.5702 16.0239 16.0289C14.5652 17.4877 12.6259 18.2912 10.5626 18.2912C8.49973 18.2912 6.56009 17.4877 5.10136 16.0289Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Search and Title End */}
      <div className=" max-1440:overflow-auto   px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-auc-primary-color-300">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="text-[18px] text-center capitalize leading-[120%] border px-[24px] py-[19px] text-auc-primary-color"
                >
                  {t(head)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table_data && table_data.length > 0 ? (
              table_data.map((item, index) => {
                const tdStyle =
                  "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";

                return (
                  <tr key={index}>
                    <td className={`${tdStyle} `}>
                      {`${index <= 8 ? "0" : ""}${index + 1}`}
                    </td>
                    <td className={`${tdStyle} w-[200px] !text-left`}>
                      {item.title}
                    </td>
                    <td className={tdStyle}>
                      {symbol} {c(item.price)}
                      <br />
                    </td>
                    <td className={tdStyle}>{item.bidder > 0 ? item.bidder + ' Persons' : "N/A"}</td>
                    <td className={tdStyle}>
                      <p
                        className={`w-[100px] h-[40px] flex items-center justify-center  rounded-[4px] mx-auto  text-[16px] 
                        ${
                          item.status === "Pending" &&
                          "bg-auc-secondary-color-700"
                        }
                        ${
                          item.status === "Active" &&
                          "bg-auc-primary-color text-auc-white-color"
                        }
                        ${
                          (item.status === "Cancel" ||
                            item.status === "Expired") &&
                          "bg-auc-light-red-color text-auc-white-color"
                        }
                        ${
                          item.status === "Upcoming" &&
                          "bg-auc-secondary-color-700"
                        }
                      `}
                      >
                        {t(item.status)}
                      </p>
                    </td>
                    <td
                      className={`${tdStyle} flex items-center justify-end gap-[12px]`}
                    >
                      {/* Edit button  */}
                      <IconButton
                        isLink={true}
                        href={`/dashboard/auctions/edit/${item.id}`}
                        styles={"auc-icon-btn-blue"}
                        svg={
                          <svg
                            className="mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1798_798)">
                              <path
                                d="M18.9999 12.0462C18.447 12.0462 18 12.4943 18 13.0461V21.0462C18 21.5972 17.5519 22.0461 17.0001 22.0461H3C2.44794 22.0461 2.00006 21.5972 2.00006 21.0462V7.04614C2.00006 6.49518 2.44794 6.0462 3 6.0462H11.0001C11.553 6.0462 12 5.59814 12 5.04626C12 4.4942 11.553 4.04614 11.0001 4.04614H3C1.34601 4.04614 0 5.39215 0 7.04614V21.0462C0 22.7002 1.34601 24.0462 3 24.0462H17.0001C18.6541 24.0462 20.0001 22.7002 20.0001 21.0462V13.0461C20.0001 12.4932 19.5529 12.0462 18.9999 12.0462Z"
                                fill="white"
                              />
                              <path
                                d="M9.37613 11.1351C9.30618 11.2051 9.25912 11.2941 9.23916 11.39L8.53219 14.9261C8.49924 15.09 8.55124 15.259 8.66916 15.3781C8.76419 15.4731 8.89218 15.524 9.02328 15.524C9.05514 15.524 9.08829 15.5211 9.12124 15.5141L12.6563 14.8071C12.7542 14.787 12.8432 14.7401 12.9123 14.67L20.8242 6.758L17.2892 3.22314L9.37613 11.1351Z"
                                fill="white"
                              />
                              <path
                                d="M23.2676 0.778152C22.2927 -0.196884 20.7067 -0.196884 19.7325 0.778152L18.3486 2.16206L21.8837 5.6971L23.2676 4.313C23.7396 3.84206 23.9996 3.214 23.9996 2.54604C23.9996 1.87807 23.7396 1.25002 23.2676 0.778152Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1798_798">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        }
                      />

                      {/* List button  */}
                      {item.status === "Active" ||
                      item.status === "Upcoming" ||
                      item.status === "Expired" ? (
                        <IconButton
                          isLink={true}
                          href={`/dashboard/auctions/details/${item.id}`}
                          styles={"auc-icon-btn-purple"}
                          svg={
                            <svg
                              className="mx-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M2.48278 2.89648C1.11145 2.89648 0 4.00794 0 5.37923C0 6.75052 1.11145 7.86201 2.48278 7.86201C3.85408 7.86201 4.96553 6.75056 4.96553 5.37923C4.96553 4.0079 3.85408 2.89648 2.48278 2.89648ZM2.48278 9.51715C1.11145 9.51715 0 10.6286 0 11.9999C0 13.3713 1.11145 14.4827 2.48278 14.4827C3.85408 14.4827 4.96553 13.3713 4.96553 11.9999C4.96553 10.6286 3.85408 9.51715 2.48278 9.51715ZM2.48278 16.1379C1.11145 16.1379 0 17.2493 0 18.6206C0 19.9919 1.11145 21.1034 2.48278 21.1034C3.85408 21.1034 4.96553 19.9919 4.96553 18.6206C4.96553 17.2493 3.85408 16.1379 2.48278 16.1379ZM9.10345 7.03441H22.3448C23.2593 7.03441 24 6.2937 24 5.37923C24 4.46476 23.2593 3.72405 22.3448 3.72405H9.10345C8.18898 3.72405 7.44827 4.46476 7.44827 5.37923C7.44827 6.2937 8.18898 7.03441 9.10345 7.03441ZM22.3448 10.3448H9.10345C8.18898 10.3448 7.44827 11.0855 7.44827 11.9999C7.44827 12.9144 8.18898 13.6551 9.10345 13.6551H22.3448C23.2593 13.6551 24 12.9144 24 11.9999C24 11.0855 23.2593 10.3448 22.3448 10.3448ZM22.3448 16.9655H9.10345C8.18898 16.9655 7.44827 17.7061 7.44827 18.6206C7.44827 19.5351 8.18898 20.2758 9.10345 20.2758H22.3448C23.2593 20.2758 24 19.5351 24 18.6206C24 17.7061 23.2593 16.9655 22.3448 16.9655Z"
                                fill="white"
                              />
                            </svg>
                          }
                        />
                      ) : (
                        <IconButton
                          isLink={false}
                          isdisable={true}
                          styles={"auc-icon-btn-purple bg-auc-gray-color cursor-pointer"}
                          svg={
                            <svg
                              className="mx-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M2.48278 2.89648C1.11145 2.89648 0 4.00794 0 5.37923C0 6.75052 1.11145 7.86201 2.48278 7.86201C3.85408 7.86201 4.96553 6.75056 4.96553 5.37923C4.96553 4.0079 3.85408 2.89648 2.48278 2.89648ZM2.48278 9.51715C1.11145 9.51715 0 10.6286 0 11.9999C0 13.3713 1.11145 14.4827 2.48278 14.4827C3.85408 14.4827 4.96553 13.3713 4.96553 11.9999C4.96553 10.6286 3.85408 9.51715 2.48278 9.51715ZM2.48278 16.1379C1.11145 16.1379 0 17.2493 0 18.6206C0 19.9919 1.11145 21.1034 2.48278 21.1034C3.85408 21.1034 4.96553 19.9919 4.96553 18.6206C4.96553 17.2493 3.85408 16.1379 2.48278 16.1379ZM9.10345 7.03441H22.3448C23.2593 7.03441 24 6.2937 24 5.37923C24 4.46476 23.2593 3.72405 22.3448 3.72405H9.10345C8.18898 3.72405 7.44827 4.46476 7.44827 5.37923C7.44827 6.2937 8.18898 7.03441 9.10345 7.03441ZM22.3448 10.3448H9.10345C8.18898 10.3448 7.44827 11.0855 7.44827 11.9999C7.44827 12.9144 8.18898 13.6551 9.10345 13.6551H22.3448C23.2593 13.6551 24 12.9144 24 11.9999C24 11.0855 23.2593 10.3448 22.3448 10.3448ZM22.3448 16.9655H9.10345C8.18898 16.9655 7.44827 17.7061 7.44827 18.6206C7.44827 19.5351 8.18898 20.2758 9.10345 20.2758H22.3448C23.2593 20.2758 24 19.5351 24 18.6206C24 17.7061 23.2593 16.9655 22.3448 16.9655Z"
                                fill="white"
                              />
                            </svg>
                          }
                        />
                      )}

                      {/* View button  */}
                      {item.status === "Active" ||
                      item.status === "Upcoming" ||
                      item.status === "Expired" ? (
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
                      ) : (
                        <IconButton
                          isLink={false}
                          isdisable={false}
                          styles={"auc-icon-btn-primary bg-auc-gray-color"}
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
                      )}
                      {/* Reject button  */}
                      {item.status === "Cancel" && (
                        <IconButton
                          styles={"auc-icon-btn-light-red"}
                          svg={
                            <svg
                              className="mx-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1798_1034)">
                                <path
                                  d="M12 0C5.3875 1.89119e-06 0 5.39158 0 12.0061C0 18.6206 5.3875 24 12 24C18.6125 24 24 18.6206 24 12.0061C24 5.39158 18.6125 -1.41839e-06 12 0ZM12 2.50188C14.2251 2.50188 16.268 3.26121 17.884 4.53466L4.50153 17.8479C3.24793 16.238 2.50112 14.213 2.50112 12.0061C2.50112 6.7437 6.7392 2.50188 12 2.50188ZM19.6279 6.32801C20.8044 7.90998 21.4989 9.87508 21.4989 12.0061C21.4989 17.2685 17.2608 21.5079 12 21.5079C9.85093 21.5079 7.87316 20.8003 6.28455 19.6046L19.6279 6.32801Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1798_1034">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          }
                        />
                      )}
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
    </>
  );
};

export default Auctions;
