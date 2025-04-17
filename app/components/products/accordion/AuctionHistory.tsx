"use client";
import React from "react";

export default function AuctionHistory({ data }) {
  const tableHead = [
    {
      id: 1,
      title: "Bidder",
    },
    {
      id: 2,
      title: "Product Price",
    },
    {
      id: 3,
      title: "Bid Price",
    },
    {
      id: 4,
      title: "Date",
    },
  ];

  const tdStyle =
    "text-[18px] capitalize leading-[120%] border p-[24px] text-auc-text-color";

  return (
    <div className="mt-[40px]">
      <table className="w-full min-w-max table-auto text-left border border-auc-text-color-500 rounded-sm">
        <tbody className="w-full min-w-max table-auto text-left">
          <tr className="bg-auc-primary-color-300">
            {tableHead.map((th, index) => (
              <th className={`${tdStyle}`} key={th.id}>
                {th.title}
              </th>
            ))}
          </tr>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              const isEven = index % 2 == 0;

              return (
                <tr
                  className={`${
                    isEven ? "bg-white" : "bg-auc-primary-color-300"
                  }`}
                  key={item.id}
                >
                  <td className={`${tdStyle}`}>{item.bidder}</td>
                  <td className={`${tdStyle}`}>{item.product_name}</td>
                  <td className={`${tdStyle}`}>{item.bid_amount}</td>
                  <td className={`${tdStyle}`}>{item.bid_date}</td>
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
  );
}
