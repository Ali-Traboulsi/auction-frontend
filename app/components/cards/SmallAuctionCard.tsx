"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";
import "moment-timezone";

// Set the output format for every react-moment instance.
Moment.globalFormat = "D MMM YYYY";

export default function SmallAuctionCard({ img, title, link_to, date }) {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return;
  }

  return (
<Link href={link_to}>
<div
      suppressHydrationWarning
      className="flex items-center gap-[16px] wow fadeInUp"
      data-wow-delay="0.1s"
    >
      {img && (
        <Image
          src={img}
          width={90}
          height={90}
          className="object-cover"
          alt={"sm auction img"}
        />
      )}
      <div className="py-[5px]">
    
          <h5 className="text-[20px] leading-[130%] font-semibold mb-[8px] transition-all hover:text-auc-primary-color">
            {title}
          </h5>
  
        <div className="flex gap-[8px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <g clipPath="url(#clip0_785_1837)">
              <path
                d="M14.25 1.5H13.5V0.75C13.5 0.551088 13.421 0.360322 13.2803 0.21967C13.1397 0.0790176 12.9489 0 12.75 0C12.5511 0 12.3603 0.0790176 12.2197 0.21967C12.079 0.360322 12 0.551088 12 0.75V1.5H6V0.75C6 0.551088 5.92098 0.360322 5.78033 0.21967C5.63968 0.0790176 5.44891 0 5.25 0C5.05109 0 4.86032 0.0790176 4.71967 0.21967C4.57902 0.360322 4.5 0.551088 4.5 0.75V1.5H3.75C2.7558 1.50119 1.80267 1.89666 1.09966 2.59966C0.396661 3.30267 0.00119089 4.2558 0 5.25L0 14.25C0.00119089 15.2442 0.396661 16.1973 1.09966 16.9003C1.80267 17.6033 2.7558 17.9988 3.75 18H14.25C15.2442 17.9988 16.1973 17.6033 16.9003 16.9003C17.6033 16.1973 17.9988 15.2442 18 14.25V5.25C17.9988 4.2558 17.6033 3.30267 16.9003 2.59966C16.1973 1.89666 15.2442 1.50119 14.25 1.5ZM1.5 5.25C1.5 4.65326 1.73705 4.08097 2.15901 3.65901C2.58097 3.23705 3.15326 3 3.75 3H14.25C14.8467 3 15.419 3.23705 15.841 3.65901C16.2629 4.08097 16.5 4.65326 16.5 5.25V6H1.5V5.25ZM14.25 16.5H3.75C3.15326 16.5 2.58097 16.2629 2.15901 15.841C1.73705 15.419 1.5 14.8467 1.5 14.25V7.5H16.5V14.25C16.5 14.8467 16.2629 15.419 15.841 15.841C15.419 16.2629 14.8467 16.5 14.25 16.5Z"
                fill="#3A4B68"
              />
              <path
                d="M9 12.375C9.62132 12.375 10.125 11.8713 10.125 11.25C10.125 10.6287 9.62132 10.125 9 10.125C8.37868 10.125 7.875 10.6287 7.875 11.25C7.875 11.8713 8.37868 12.375 9 12.375Z"
                fill="#3A4B68"
              />
              <path
                d="M5.25 12.375C5.87132 12.375 6.375 11.8713 6.375 11.25C6.375 10.6287 5.87132 10.125 5.25 10.125C4.62868 10.125 4.125 10.6287 4.125 11.25C4.125 11.8713 4.62868 12.375 5.25 12.375Z"
                fill="#3A4B68"
              />
              <path
                d="M12.75 12.375C13.3713 12.375 13.875 11.8713 13.875 11.25C13.875 10.6287 13.3713 10.125 12.75 10.125C12.1287 10.125 11.625 10.6287 11.625 11.25C11.625 11.8713 12.1287 12.375 12.75 12.375Z"
                fill="#3A4B68"
              />
            </g>
            <defs>
              <clipPath id="clip0_785_1837">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className="block text-[12px] font-regular leading-[170%]">
            <Moment date={date} />
          </span>
        </div>
      </div>
    </div>
</Link>
  );
}
