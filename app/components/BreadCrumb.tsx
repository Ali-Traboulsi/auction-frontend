"use client";
import React, { useEffect } from "react";
import useLanguage from "../hook/UseLanguage";
import Image from "next/image";
import Link from "next/link";
import useGlobalStore from "../store/GlobalStore";

export default function BreadCrumb({ currentPage }) {
  const t = useLanguage();
  const store = useGlobalStore();
  useEffect(() => {
    store?.setActivePage(currentPage);
  }, []);

  return (
    <div className="bg-auc-dark-color-2 py-[40px] ">
      <div className="auc-container">
        <div className="grid grid-cols-12 content-center">
          <div className="flex col-span-6  items-center">
            <div>
              <h2
                suppressHydrationWarning
                className="font-bold leading-[120%] text-white wow fadeInUp mb-[30px]"
              >
                {/* Auction */}
                {currentPage}
              </h2>
              <ul className="flex gap-4 ul-with-after-before">
                <li
                  suppressHydrationWarning
                  className="wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <Link
                    className="inline-block transition-all text-white hover:text-auc-primary-color"
                    href="/"
                  >
                    {t("Home")}
                  </Link>
                </li>
                <li
                  suppressHydrationWarning
                  className="wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <span className="inline-block text-white">
                    {/* Auction */}
                    {t(currentPage)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative hidden col-span-6  md:grid grid-cols-2 gap-[24px] h-[380px] max-1200:h-[330px] max-992:h-[260px] max-768:h-[190px] ">
            {store?.breadcrumb1 && (
              <Image
                src={store?.breadcrumb1}
                width={302}
                height={270}
                alt="breadcrumb img"
                suppressHydrationWarning
                className="wow fadeInUp w-[302px] max-1200:w-[280px] h-[270px] max-1200:h-[230px] max-992:h-[180px] max-768:h-[130px] object-cover rounded-[8px]"
                data-wow-delay="0.1s"
              />
            )}
            {store?.breadcrumb2 && (
              <Image
                src={store?.breadcrumb2}
                width={302}
                height={270}
                alt="breadcrumb img"
                suppressHydrationWarning
                className="wow fadeInUp w-[302px] max-1200:w-[280px] h-[270px] max-1200:h-[230px] max-992:h-[180px] max-768:h-[130px] object-cover rounded-[8px] mt-auto"
                data-wow-delay="0.1s"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
