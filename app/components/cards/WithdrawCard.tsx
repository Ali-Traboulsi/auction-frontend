"use client";

import React, { useEffect, useState } from "react";
import NiceSelect from "../NiceSelect/NiceSelect";
import { IDepositAndWithdrowCard } from "../../interfaces/interfaces";
import Button from "../buttons/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useLanguage from "../../hook/UseLanguage";
import { AddMoneySkeleton } from "../skeleton/skeleton";
import useCurrency from "../../hook/UseCurrency";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";

const WithdrawCard: React.FC<IDepositAndWithdrowCard> = ({ title }) => {
  const [loading, setloading] = useState(false);
  const [isdataSending, setisdataSending] = useState(false);
  const [payment_gateway_id, setpayment_gateway_id] = useState(null);
  const [withdrawAmount, setwithdrawAmount] = useState(null);
  const [paymentsMethods, setpaymentsMethods] = useState([]);
  const [activePayment, setactivePayment] = useState(null);
  const token = Cookies.get("user_token");
  const t = useLanguage();
  const c = useCurrency();
  const symbol = useCurrencySymbol();

  const router = useRouter();

  const fetchPaymentMethods = () => {
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/withdraw-methods`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === true || 200) {
          setpaymentsMethods(result.data);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };
  let paymentOptions = [];

  paymentOptions = paymentsMethods
    ? paymentsMethods.map((py) => {
        return {
          label: py.name,
          value: py.id,
          data: py,
        };
      })
    : [];

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (payment_gateway_id === null) {
      toast.warning("Please select a Gateway!");
    }
    if (withdrawAmount === null) {
      toast.warning("Amount is Required!");
    }
    if (payment_gateway_id && withdrawAmount) {
      const formData = new FormData();
      formData.append("amount", withdrawAmount);
      formData.append("method_id", payment_gateway_id);
      setisdataSending(true);
      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      fetch(
        `${process.env.API_BASE_URL}/api/user/withdraw-money`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 401) {
            Cookies.remove("user_token");
            router.replace("/login");
            router.refresh();
          }
          if (result.status === 200) {
            toast.success(result.success);
            router.push("/dashboard/withdraw/log");
          }
          if (result.status === 403) {
            toast.warn(result.error);
          }
          setisdataSending(false);
        })
        .catch((error) => {
          console.log("error", error);
          setisdataSending(false);
        });
    }
  };

  if (loading) return <AddMoneySkeleton />;

  return (
    <form onSubmit={handleWithdraw}>
      <div className="flex flex-col items-start gap-[32px] p-[40px] min-768:w-[508px] mx-auto rounded-[12px] border border-auc-gray-color bg-auc-white-color">
        <div className="flex w-full py-[29px] justify-center items-center gap-[10px] rounded-[4px] bg-auc-white-smoke-color">
          <h3 className="text-[20px] min-768:text-[24px] min-1200:text-[32px]">
            {t(title)}
          </h3>
        </div>
        <div className="w-full flex flex-col items-center gap-[24px]">
          {/* Select Gateway Start */}
          <div className="w-full">
            <label htmlFor="gateway">{t("Select Gateway")}</label>
            <div className="relative mt-[16px]">
              <NiceSelect
                options={paymentOptions}
                defaultValue={payment_gateway_id}
                onChange={(e: any) => {
                  setpayment_gateway_id(e.value);
                  setactivePayment(e.data);
                }}
                wrapperClass=""
              />
            </div>
          </div>
          {/* Select Gateway End */}
          {/* Amount Start */}
          <div className="w-full mb-[24px]">
            <label htmlFor="amount">{t("Amount")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="number"
              autoComplete="off"
              name="amount"
              id="amount"
              placeholder="Amount"
              onChange={(e) => {
                setwithdrawAmount(e.target.value);
              }}
            />
          </div>
          {/* Amount End */}
          {activePayment && (
            <div className="w-full mb-[24px] capitalize">
              <span>
                {" "}
                {t("minimum amount is:")} {c(activePayment?.min_amount)}{" "}
                {symbol && symbol}
              </span>
              <span>
                {"  &  "}
                {t("maximum amount is:")} {c(activePayment?.max_amount)}{" "}
                {symbol && symbol}
              </span>
            </div>
          )}
          <Button
            isLoading={isdataSending}
            isdisabled={isdataSending}
            btnType="submit"
            text={isdataSending ? t("Processing...") : t("Confirm")}
            styles={"auc-btn-primary w-full"}
          />
        </div>
      </div>
    </form>
  );
};

export default WithdrawCard;
