"use client";

import React, { useEffect, useState } from "react";
import NiceSelect from "../NiceSelect/NiceSelect";
import { IDepositAndWithdrowCard } from "../../interfaces/interfaces";
import Button from "../buttons/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useLanguage from "../../hook/UseLanguage";
import { AddMoneySkeleton } from "../skeleton/skeleton";
import useCurrencySymbol from "../../hook/UseCurrencySymbol";

const DepositCard: React.FC<IDepositAndWithdrowCard> = ({ title }) => {
  const [loading, setloading] = useState(false);
  const [payment_gateway_id, setpayment_gateway_id] = useState(false);
  const [depostAmount, setdepostAmount] = useState(null);
  const [paymentsMethods, setpaymentsMethods] = useState([]);
  const token = Cookies.get("user_token");
  const default_currency = Cookies.get("default_currency");
  const parsed_currency = default_currency && JSON.parse(default_currency);
  console.log(parsed_currency);

  const router = useRouter();
  const t = useLanguage();
  const symbol = useCurrencySymbol();

  const fetchPaymentMethods = () => {
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/payment/gateways`,
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
          setpaymentsMethods(result.data.gateways);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  let paymentOptions = [];

  paymentOptions =
    paymentsMethods &&
    paymentsMethods.map((py) => {
      return {
        label: py.name,
        value: py.id,
      };
    });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleDeposit = (e) => {
    e.preventDefault();
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${
        process.env.API_BASE_URL
      }/api/user/deposit/store?amount=${depostAmount}&gateway_id=${payment_gateway_id}&currency_id=${
        parsed_currency?.currency?.id || 1
      }`,
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
          window.location.href = `${result.data.route}`;
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  if (loading) return <AddMoneySkeleton />;

  return (
    <form onSubmit={handleDeposit}>
      <div className="flex flex-col items-start gap-[32px] p-[40px] min-768:w-[508px] mx-auto rounded-[12px] border border-auc-gray-color bg-auc-white-color">
        <div className="flex w-full py-[29px] justify-center items-center gap-[10px] rounded-[4px] bg-auc-white-smoke-color">
          <h3 className="text-[20px] min-768:text-[24px] min-1200:text-[32px]">
            {t(title)}
          </h3>
        </div>
        <div className="w-full flex flex-col items-center gap-[24px]">
          {/* Select Gateway Start */}
          {paymentOptions && (
            <div className="w-full">
              <label htmlFor="gateway">{t("Select Gateway")}</label>
              <div className="relative mt-[16px]">
                <NiceSelect
                  options={paymentOptions}
                  defaultValue={payment_gateway_id}
                  onChange={(e: any) => {
                    setpayment_gateway_id(e.value);
                  }}
                  wrapperClass=""
                />
              </div>
            </div>
          )}
          {/* Select Gateway End */}
          {/* Amount Start */}
          <div className="w-full">
            <label htmlFor="amount">{t("Amount")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="number"
              autoComplete="off"
              name="amount"
              id="amount"
              placeholder="Amount"
              onChange={(e) => {
                setdepostAmount(e.target.value);
              }}
            />
          </div>
          {/* Amount End */}
          <Button
            isdisabled={loading}
            isLoading={loading}
            btnType="submit"
            text={loading ? t("Processing..") : t("Confirm")}
            styles={"auc-btn-primary w-full"}
          />
        </div>
      </div>
    </form>
  );
};

export default DepositCard;
