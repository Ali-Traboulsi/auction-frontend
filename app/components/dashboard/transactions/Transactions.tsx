"use client";
import React from "react";
import { ITransactions } from "../../../interfaces/interfaces";
import useLanguage from "../../../hook/UseLanguage";
import useCurrency from "../../../hook/UseCurrency";
import useCurrencySymbol from "../../../hook/UseCurrencySymbol";

const Transactions: React.FC<ITransactions> = ({
  transections_data,
  main_transection = false,
}) => {
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  const th_charge_or_balance = main_transection ? "Charge" : "Balance";
  const tableHead = [
    "S.N.",
    "Date",
    "Transaction ID",
    "Amount",
    th_charge_or_balance,
    "Details",
  ];

  const thDataStyle =
    "text-[18px] text-center capitalize leading-[120%] border  py-[19px] text-auc-primary-color";
  const tdStyle =
    "text-[16px] capitalize leading-[150%] border px-[24px] py-[19px] text-auc-text-color text-center";

  return (
    <>
      <div className="max-1440:overflow-auto   px-0">
        <table
          suppressHydrationWarning
          data-wow-delay="0.2s"
          className="w-full wow fadeInUp min-w-max table-auto text-left"
        >
          <thead>
            <tr className=" bg-auc-primary-color-300">
              {tableHead.map((head) => (
                <th key={head} className={thDataStyle}>
                  {t(head)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transections_data && transections_data.length > 0 ? (
              transections_data.map((td, index) => {
                return (
                  <tr key={index} className="">
                    <td className={`${tdStyle} w-[75px] !px-[0px]`}>
                      {`${index <= 8 ? "0" : ""}${index + 1}`}
                    </td>
                    <td className={`${tdStyle} w-[133px]`}>
                      {td.date || td.update_created_at}
                    </td>
                    <td className={`${tdStyle} w-[188px]`}>
                      {td.trx || td.trnx}
                    </td>
                    <td
                      className={`${tdStyle} w-[161px] ${td.type === "+"
                        ? "!text-auc-primary-color"
                        : "!text-[red]"
                        }`}
                    >
                      {td.type} {symbol} {c(td.amount)}
                    </td>
                    <td className={`${tdStyle} w-[162px] !px-[40px]`}>
                      <div className="flex flex-nowrap">
                        <span>  {symbol}</span> <span>{main_transection ? c(td.charge) : c(td.balance)}</span>
                      </div>
                    </td>
                    <td className={`${tdStyle} w-[209px] !text-left`}>
                      {td.details}
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

export default Transactions;
