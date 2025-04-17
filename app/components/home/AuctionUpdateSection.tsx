"use client";
import React, { useState, useEffect } from "react";
import TitleBox from "../TitleBox";
import Image from "next/image";
import SmallAuctionCard from "../cards/SmallAuctionCard";
import Link from "next/link";
import Button from "../buttons/Button";
import Moment from "react-moment";
import "moment-timezone";
import useLanguage from "../../hook/UseLanguage";

// Set the output format for every react-moment instance.
Moment.globalFormat = "D MMM YYYY";

export default function AuctionUpdateSection({ page_data, title, subtitle }) {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  const lg_blog = page_data[0];
  const sm_blogs = page_data.slice(1);

  const t = useLanguage();

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return;
  }

  return (
    <div className="pb-[120px] pt-[110px] bg-auc-primary-color-300">
      <div className="auc-container">
        <TitleBox title={title} subtitle={subtitle} />
        <div className="grid lg:grid-cols-12 gap-[60px] lg:gap-0">
          <div
            suppressHydrationWarning
            className="lg:col-span-8 lg:mr-[30px] xl:mr-[80px] wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="bg-white rounded-[16px] overflow-hidden">
              {lg_blog?.image && (
                <Image
                  src={lg_blog?.image}
                  width={789}
                  height={422}
                  alt="auction update img "
                  className="w-full  max-h-[422px] object-cover "
                />
              )}

              <div className="px-[24px] py-[16px] flex flex-wrap gap-[16px] md:divide-x-2">
                <div className="flex flex-wrap gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
                      stroke="#3A4B68"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.59 22.5C20.59 18.63 16.74 15.5 12 15.5C7.26003 15.5 3.41003 18.63 3.41003 22.5"
                      stroke="#3A4B68"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[16px] leading-[170%] font-normal text-auc-text-color-800 capitalize">
                    By: Admin
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 md:pl-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_785_1807)">
                      <path
                        d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z"
                        fill="#3A4B68"
                      />
                      <path
                        d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z"
                        fill="#3A4B68"
                      />
                      <path
                        d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z"
                        fill="#3A4B68"
                      />
                      <path
                        d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z"
                        fill="#3A4B68"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_785_1807">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[16px] leading-[170%] font-normal text-auc-text-color-800 capitalize">
                    <Moment date={lg_blog?.created_at} />
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 md:pl-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M4.40476 16.0264L8.93476 20.5564C10.7948 22.4164 13.8148 22.4164 15.6848 20.5564L20.0748 16.1664C21.9348 14.3064 21.9348 11.2864 20.0748 9.41637L15.5348 4.89637C14.5848 3.94637 13.2748 3.43637 11.9348 3.50637L6.93476 3.74637C4.93476 3.83637 3.34476 5.42637 3.24476 7.41637L3.00476 12.4164C2.94476 13.7664 3.45476 15.0764 4.40476 16.0264Z"
                      stroke="#3A4B68"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.73438 12.7263C11.1151 12.7263 12.2344 11.607 12.2344 10.2263C12.2344 8.84561 11.1151 7.72632 9.73438 7.72632C8.35366 7.72632 7.23438 8.84561 7.23438 10.2263C7.23438 11.607 8.35366 12.7263 9.73438 12.7263Z"
                      stroke="#3A4B68"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.2344 17.7263L17.2344 13.7263"
                      stroke="#3A4B68"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Link
                    href={`/blogs?category=${lg_blog?.category?.slug}`}
                    className="text-[16px] leading-[170%] font-normal text-auc-text-color-800 capitalize"
                  >
                    {lg_blog?.category?.name}
                  </Link>
                </div>
              </div>

              <div className="px-[24px]   pb-[40px]">
                <Link href={`/blogs/${lg_blog?.id}-${lg_blog?.slug}`}>
                  <h3 className="leading-[130%] font- mb-[24px] text-semibold transition-all hover:text-auc-primary-color">
                    {lg_blog?.title}
                  </h3>
                </Link>
                <p
                  className="leading-[160%] mb-[40px]"
                  dangerouslySetInnerHTML={{
                    __html: lg_blog?.description,
                  }}
                ></p>

                <Button
                  isLink={true}
                  href={`/blogs/${lg_blog?.id}-${lg_blog?.slug}`}
                  text={t("Read More")}
                  styles={"auc-btn-primary"}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-[16px]">
            {sm_blogs &&
              sm_blogs.map((blog, index) => (
                <SmallAuctionCard
                  key={index}
                  img={blog?.image}
                  title={blog?.title}
                  link_to={`/blogs/${lg_blog?.id}-${lg_blog?.slug}`}
                  date={blog.created_at}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
