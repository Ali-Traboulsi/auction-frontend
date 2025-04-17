"use client";

import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { IDashboardCard } from "../../interfaces/interfaces";
import useLanguage from "../../hook/UseLanguage";
import useCurrency from "../../hook/UseCurrency";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";

const DashboardCard: React.FC<IDashboardCard> = ({
  img,
  value,
  title,
  currencySymbol,
}) => {
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  return (
    <div
      suppressHydrationWarning
      data-wow-delay="0.2s"
      className={`
            flex flex-col gap-[16px] items-center p-[32px] rounded-[8px] border border-opacity-0 hover:border-opacity-100 text-center transition-all duration-300 ease-in-out wow fadeInUp
            ${title === "Current Balance" &&
        "bg-[#0080801a] border-auc-primary-color-900"
        }
            ${title === "Total Deposit" && "bg-[#f055551a] border-[#F05555]"}
            ${title === "Total withdraw" && "bg-[#26c3a41a] border-[#26C3A4]"}
            ${title === "Total Tickets" && "bg-[#ffb1341a] border-[#FFB134]"}
            ${title === "Total Bid" && "bg-[#5b68ff1a] border-[#5B68FF]"}
            ${title === "Total Bid Amount" && "bg-[#00c2ff1a] border-[#00C2FF]"}
            ${title === "Win Product" && "bg-[#da55f01a] border-[#DA55F0]"}
            ${title === "Total Lost Bid" && "bg-[#ff3a691a] border-[#FF3A69]"}
        `}
    >
      {img && <Image src={img} className="" width={80} height={80} alt="" />}
      <div className="flex flex-col gap-[8px]">
        <p className="text-[24px] leading-[31.2px] font-semibold">
          {currencySymbol && symbol}
          {symbol ?

            <CountUp end={c(value)} /> :
            <CountUp end={value} />


          }
        </p>
        <p className="text-[18px] leading-[21.6px]">{t(title)}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
