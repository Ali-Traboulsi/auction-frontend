"use client";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Countdown from "react-countdown-simple";
import Cookies from "js-cookie";
import Button from "../buttons/Button";
import { toast } from "react-toastify";
import Image from "next/image";
import useLanguage from "../../hook/UseLanguage";
import useCurrency from "../../hook/UseCurrency";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";
const token = Cookies.get("user_token");

export default function AddToCartSection({ page_data }) {
  const [loading, setLoading] = useState(true);
  const [isformSubmitting, setisformSubmitting] = useState(false);
  const [bidAmount, setBidAmount] = useState(null);
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();
  const [countdown_enddate, setcountdown_enddate] = useState(
    new Date().toDateString()
  );

  useEffect(() => {
    setcountdown_enddate((prevDate) =>
      new Date(page_data.data.end_date).toDateString()
    );

  
    setBidAmount(page_data?.data?.highest_bid + 1);
    setLoading(false);
  }, []);

  const handleOnchangeForBid = (e) => {
    const value = e.target.value;
    if (value) {
      setBidAmount(Number(e.target.value));
    } else {
      setBidAmount(null);
    }
  };
  const handleSubmitBid = (e) => {
    e.preventDefault();

    if (token) {
      setisformSubmitting(true);
      const default_currency = Cookies.get("default_currency")
        ? JSON.parse(Cookies.get("default_currency"))
        : null;
      const currency_id = default_currency?.id || 1;
      let formdata = new FormData();
      formdata.append("bid_amount", bidAmount);
      formdata.append("auction_id", page_data.data.id);
      formdata.append("currency_id", currency_id);

      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      };

      fetch(`${process.env.API_BASE_URL}/api/user/bid/store`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "error") {
            toast.warning(result.message);
          } else {
            toast.success(result.message);
          }
          setBidAmount(null);
          setisformSubmitting(false);
        })
        .catch((error) => {
          toast.error(`Something went wrong!!`);
          console.log("error", error);
          setisformSubmitting(false);
        });
    } else {
      toast.warn("Please login first.");
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="py-[120px] overflow-hidden">
      <div className="auc-container">
        <div className="grid min-992:grid-cols-2 gap-[60px]">
          <div
            suppressHydrationWarning
            className=" auc-product-gallery sticky wow fadeInUp mx-auto overflow-hidden max-1200:relative max-1200:top-[-34px] w-full"
            data-wow-delay="0.1s"
          >
            {page_data.data.gallery &&
            Array.isArray(page_data?.data?.gallery) ? (
              <ImageGallery
                items={page_data.data.gallery}
                showFullscreenButton={false}
                showThumbnails={true}
                originalHeight={592}
                originalWidth={628}
                originalclassName="wow"
                thumbnailclassName={`wow thumb class`}
                thumbnailWidth={181}
                thumbnailHeight={181}
                showPlayButton={false}
                showNav={false}
              />
            ) : (
              <Image
                width={628}
                height={592}
                src={page_data?.data?.image}
                alt="auction-img"
                className="mb-[16px] w-full"
              />
            )}
          </div>

          <div className="stickyy top-0 ">
            <h2
              suppressHydrationWarning
              className="mb-[10px] min-1440:mb-[16px] wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {page_data?.data?.title}
            </h2>

            <p
              suppressHydrationWarning
              className="mb-[10px] min-1440:mb-[16px] wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {page_data?.data?.short_description}
            </p>

            <div
              suppressHydrationWarning
              className="flex gap-3  text-[14px] min-1440:text-[18px] leading-[160%] mb-[24px] wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <span className=" font-bold">{t("Item Condition")}:</span>
              <span className="font-regular">
                {page_data?.data?.auction_condition}
              </span>
            </div>

            <span
              suppressHydrationWarning
              className="block font-bold text-[18px] leading-[160%] mb-[16px] wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {t("Time Left")}:
            </span>

            <div>
              <Countdown
                targetDate={countdown_enddate}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div
                    suppressHydrationWarning
                    className="flex flex-wrap gap-[16px] mb-[24px] wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <div className="w-[80px] h-[80px] rounded-[50%] bg-auc-primary-color-300 flex flex-col justify-center items-center text-center">
                      <p className="font-semibold">{days}</p>
                      <span className="text-[16px] font-normal leading-[120%]">
                        {t("Days")}
                      </span>
                    </div>
                    <div className="w-[80px] h-[80px] rounded-[50%] bg-auc-primary-color-300 flex flex-col justify-center items-center text-center">
                      <p className="font-semibold">{hours}</p>
                      <span className="text-[16px] font-normal leading-[120%]">
                        {t("Hours")}
                      </span>
                    </div>
                    <div className="w-[80px] h-[80px] rounded-[50%] bg-auc-primary-color-300 flex flex-col justify-center items-center text-center">
                      <p className="font-semibold">{minutes}</p>
                      <span className="text-[16px] font-normal leading-[120%]">
                        {t("Minutes")}
                      </span>
                    </div>
                    <div className="w-[80px] h-[80px] rounded-[50%] bg-auc-primary-color-300 flex flex-col justify-center items-center text-center">
                      <p className="font-semibold">{seconds}</p>
                      <span className="text-[16px] font-normal leading-[120%]">
                        {t("Seconds")}
                      </span>
                    </div>
                  </div>
                )}
              />
            </div>
            <div
              suppressHydrationWarning
              className="flex gap-3 text-[18px] leading-[160%] mb-[24px] wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <span className="font-bold">{t("Auction ends")}:</span>
              <span className="font-regular">{page_data?.data?.end_date}</span>
            </div>

            <form onSubmit={handleSubmitBid}>
              <div
                suppressHydrationWarning
                className="bg-auc-primary-color-300 p-[20px] min-1440:p-[32px] rounded-[16px] wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <h4
                  suppressHydrationWarning
                  className="uppercase leading-[130%] font-semibold mb-[10px] min-1440:mb-[24px] wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  {t("BID NOW")}
                </h4>
                <div className="mb-[10px] min-1440:mb-[24px]">
                  <p
                    suppressHydrationWarning
                    className="wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    {t("Minimum bid for this auction is")}  {symbol}{" "}
                    {c(page_data?.data?.price)}
                  </p>
                  <p
                    suppressHydrationWarning
                    className="wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    {t("Highest bid")}: {symbol}{" "}
                    {c(page_data?.data?.highest_bid)}
                  </p>
                  <p
                    suppressHydrationWarning
                    className="wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    {t("Bids")}: {page_data?.data?.bidcount}
                  </p>
                </div>
                <div
                  data-wow-delay="0.1s"
                  className="flex flex-wrap gap-[16px] wow fadeInUp"
                  suppressHydrationWarning
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (bidAmount > 0) {
                        setBidAmount(bidAmount - 1);
                      } else {
                        alert("Amount is less than 0");
                      }
                    }}
                    className="w-[60px] h-[60px] rounded-[8px] bg-white flex justify-center items-center"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.00177 11C2.74035 11.0057 2.49156 11.1136 2.3087 11.3005C2.12584 11.4874 2.02344 11.7385 2.02344 12C2.02344 12.2615 2.12584 12.5125 2.3087 12.6994C2.49156 12.8864 2.74035 12.9943 3.00177 13H20.9979C21.2593 12.9943 21.5081 12.8864 21.6909 12.6994C21.8738 12.5125 21.9762 12.2615 21.9762 12C21.9762 11.7385 21.8738 11.4874 21.6909 11.3005C21.5081 11.1136 21.2593 11.0057 20.9979 11H3.00177Z"
                        fill="#091E42"
                      />
                    </svg>
                  </button>
                  <input
                    placeholder="0"
                    value={bidAmount}
                    type="number"
                    onChange={handleOnchangeForBid}
                    className="border border-auc-border-color  min-1200:min-w-[210px] py-[18px] px-[24px] h-[60px] rounded-[8px] bg-white flex justify-center items-center text-[18px] leading-[120%] font-semibold text-center"
                  />

                  <button
                    onClick={() => {
                      setBidAmount(bidAmount + 1);
                    }}
                    type="button"
                    className="w-[60px] h-[60px] rounded-[8px] bg-white flex justify-center items-center"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.0625 11.0625H12.9375V0.9375C12.9375 0.419719 12.5178 0 12 0C11.4822 0 11.0625 0.419719 11.0625 0.9375V11.0625H0.9375C0.419719 11.0625 0 11.4822 0 12C0 12.5178 0.419719 12.9375 0.9375 12.9375H11.0625V23.0625C11.0625 23.5803 11.4822 24 12 24C12.5178 24 12.9375 23.5803 12.9375 23.0625V12.9375H23.0625C23.5803 12.9375 24 12.5178 24 12C24 11.4822 23.5803 11.0625 23.0625 11.0625Z"
                        fill="#091E42"
                      />
                    </svg>
                  </button>
                  <Button
                    isLoading={isformSubmitting}
                    isdisabled={isformSubmitting}
                    styles="w-[60px] h-[60px] rounded-[8px] bg-auc-primary-color hover:bg-auc-primary-hover-color text-white flex justify-center items-center"
                    isLink={false}
                    btnType="submit"
                    text={`Bid`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
