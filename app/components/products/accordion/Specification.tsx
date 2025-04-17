"use client";
import React from "react";

export default function Specification({ data }) {
  const tableData = [
    {
      id: 1,
      key: "color",
      value: "white",
    },
    {
      id: 2,
      key: "Model",
      value: "514HG",
    },
    {
      id: 3,
      key: "Model",
      value: "514HG",
    },
    {
      id: 4,
      key: "Condition",
      value: "Used",
    },
    {
      id: 5,
      key: "Material",
      value: "AAAAAAAA",
    },
    {
      id: 6,
      key: "Warranty",
      value: "AAAAAAAA",
    },
    {
      id: 7,
      key: "Category",
      value: "AAAAAAAA",
    },
  ];
  const tdStyle =
    "text-[18px] capitalize leading-[120%] border p-[24px] text-auc-text-color";
  return (
    <div className="mt-[40px]">
      {data && (
        <table className="w-full min-w-max table-auto text-left border border-auc-text-color-500 rounded-sm">
          <tbody className="w-full min-w-max table-auto text-left">
            {Object.entries(data).map(
              ([key, value]: [string, string], index) => {
                const isEven = index % 2 === 0;

                return (
                  <tr
                    className={`${
                      isEven ? "bg-auc-primary-color-300" : "bg-white"
                    }`}
                    key={index}
                  >
                    <td className={`${tdStyle} w-[20%]`}>{key}</td>
                    <td className={`${tdStyle}`}>{value}</td>
                  </tr>
                );
              }
            )}
            {/* {tableData.map((item, index) => {
            const isEven = index % 2 == 0;

            return (
              <tr
                className={`${
                  isEven ? "bg-auc-primary-color-300" : "bg-white"
                }`}
                key={item.id}
              >
                <td className={`${tdStyle} w-[20%]`}>
                  {item.key}
                </td>
                <td className={`${tdStyle}`}>
                  {item.value}
                </td>
              </tr>
            );
          })} */}
          </tbody>
        </table>
      )}
    </div>
  );
}
