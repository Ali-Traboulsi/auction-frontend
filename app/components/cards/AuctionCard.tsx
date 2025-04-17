"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IAuctionCard } from "../../interfaces/interfaces";
import Button from "../buttons/Button";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useLanguage from "../../hook/UseLanguage";
import useCurrency from "../../hook/UseCurrency";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";
import { truncateString } from "../../helpers/helpers";

const AuctionCard: React.FC<IAuctionCard> = ({
  img,
  title,
  ratings,
  bid,
  time,
  wrapperCls,
  smCard = false,
  currency,
  slug,
  item_id,
  isWish,
  is_own,
  price,
}) => {
  const [loading, setloading] = useState(false);
  const [isWishlistActive, setisWishlistActive] = useState(false);
  const token = Cookies.get("user_token");
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  const handleWishlist = () => {
    if (token) {
      if (!is_own) {
        setloading(true);
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: { revalidate: 3600 },
        };

        fetch(
          `${process.env.API_BASE_URL}/api/user/wishlist/store/${item_id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((res) => {
            if (res.status === true || 200) {
              toast.success(res.message);
            } else {
              toast.warn(res?.error?.message);
            }

            setisWishlistActive(true);
            setloading(false);
          })
          .catch((error) => {
            toast.error(error?.error?.message);
            console.log("error", error);
            setloading(false);
          });
      } else {
        toast.warn("You can not add your own product!!");
      }
    } else {
      toast.warn("Please login first!!");
    }
  };

  useEffect(() => {
    setisWishlistActive(isWish);
  }, []);

  return (
    <div
      className={`rounded-[12px]  bg-white auc-shadow-secondary border group border-auc-primary-color border-opacity-0 hover:border-opacity-100 transition-all  ${
        smCard ? "p-[16px]" : "p-[24px]"
      } ${wrapperCls && wrapperCls}`}
    >
      <div className="relative">
        {img && (
          <Image
            width={363}
            height={337}
            src={img}
            alt="auction-img"
            className="mb-[16px] rounded-[12px] w-full min-768:h-[280px] min-1440:h-[337px] object-cover"
          />
        )}

        {/* wishlist */}
        <button
          onClick={handleWishlist}
          type="button"
          className={`${
            isWishlistActive == true
              ? "bg-red-900 bg-opacity-100"
              : "bg-white bg-opacity-30"
          }  absolute bottom-[10px]  right-[10px]  w-[40px] h-[40px] flex justify-center items-center rounded-lg`}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4778_1611)">
              <path
                d="M12.0125 22.6648C11.6708 22.6648 11.3414 22.541 11.0847 22.3162C10.1151 21.4684 9.18036 20.6717 8.35565 19.9689L8.35144 19.9653C5.93353 17.9048 3.84558 16.1254 2.39282 14.3725C0.76886 12.4129 0.0124512 10.5549 0.0124512 8.52521C0.0124512 6.55316 0.68866 4.73383 1.91638 3.4021C3.15875 2.05463 4.86346 1.3125 6.71704 1.3125C8.10242 1.3125 9.37115 1.75049 10.4879 2.6142C11.0515 3.05017 11.5624 3.58374 12.0125 4.20612C12.4627 3.58374 12.9734 3.05017 13.5372 2.6142C14.6539 1.75049 15.9227 1.3125 17.308 1.3125C19.1614 1.3125 20.8663 2.05463 22.1087 3.4021C23.3364 4.73383 24.0125 6.55316 24.0125 8.52521C24.0125 10.5549 23.2562 12.4129 21.6323 14.3723C20.1795 16.1254 18.0917 17.9046 15.6742 19.9649C14.848 20.6688 13.9118 21.4667 12.9401 22.3165C12.6835 22.541 12.3539 22.6648 12.0125 22.6648ZM6.71704 2.71838C5.2608 2.71838 3.92303 3.29956 2.94983 4.35498C1.96216 5.42633 1.41815 6.90729 1.41815 8.52521C1.41815 10.2323 2.05261 11.759 3.47516 13.4755C4.8501 15.1346 6.8952 16.8774 9.26312 18.8954L9.26752 18.899C10.0953 19.6046 11.0338 20.4044 12.0104 21.2584C12.993 20.4027 13.9329 19.6016 14.7623 18.895C17.1301 16.877 19.175 15.1346 20.5499 13.4755C21.9723 11.759 22.6068 10.2323 22.6068 8.52521C22.6068 6.90729 22.0627 5.42633 21.0751 4.35498C20.1021 3.29956 18.7641 2.71838 17.308 2.71838C16.2413 2.71838 15.2618 3.0575 14.397 3.7262C13.6263 4.32239 13.0895 5.07605 12.7747 5.60339C12.6129 5.87457 12.3279 6.03644 12.0125 6.03644C11.697 6.03644 11.412 5.87457 11.2502 5.60339C10.9356 5.07605 10.3987 4.32239 9.62787 3.7262C8.76306 3.0575 7.78363 2.71838 6.71704 2.71838Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_4778_1611">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.0124512)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="flex justify-between mb-[24px]">
        <h4
          className={`capitalize font-semibold group-hover:text-auc-primary-color ${
            smCard ? "text-[20px]" : "text-[24px]"
          }`}
        >
          <Link href={`/product/details/${slug}`}>
            {truncateString(title, 30)}
          </Link>
        </h4>
      </div>

      <div className="flex mb-[24px]">
        <div
          className={`text-center bg-auc-primary-color-300  w-1/2 ${
            smCard ? "px-[12px] py-[6px]" : "px-[16px] py-[8px]"
          }`}
        >
          <h5
            className={`leading-[160%] ${
              smCard ? "text-[16px]" : "text-[18px]"
            }`}
          >
            {t("Highest Bid")}
          </h5>
          <span
            className={`font-regular leading-[170%] ${
              smCard ? "text-[14px]" : "text-[16px]"
            }`}
          >
            {symbol} {c(price)}
          </span>
        </div>
        <div
          className={`text-center bg-auc-secondary-color-200 w-1/2 ${
            smCard ? "px-[12px] py-[6px]" : "px-[16px] py-[8px]"
          }`}
        >
          <h5
            className={`leading-[160%] ${
              smCard ? "text-[16px]" : "text-[18px]"
            }`}
          >
            {t("Time Left")}
          </h5>
          <span
            className={`font-regular leading-[170%] ${
              smCard ? "text-[14px]" : "text-[16px]"
            }`}
          >
            {time}
          </span>
        </div>
      </div>

      <Button
        isLink={true}
        href={`/product/details/${slug}`}
        text={t("submit a bid")}
        styles={"auc-btn-primary-outline !py-[16px] w-full"}
      />
    </div>
  );
};

export default AuctionCard;
