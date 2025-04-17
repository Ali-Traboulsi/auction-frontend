"use client";

import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "@material-tailwind/react";
import delay from "delay";
import Button from "../../buttons/Button";
import { useFormik } from "formik";
import { object, string, number, date, InferType, mixed } from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import useLanguage from "../../../hook/UseLanguage";
import { TwoFactorSkeleton } from "../../skeleton/skeleton";
import { url } from "inspector";

const TwoFactor = () => {
  const [copied, setCopied] = useState(false);
  const [loading, setloading] = useState(false);
  const [qrcodeDetails, setqrcodeDetails] = useState(null);
  const [enableCode, setenableCode] = useState("");
  const [twoFacEnable, settwoFacEnable] = useState();
  const router = useRouter();
  const token = Cookies.get("user_token");
  const t = useLanguage();

  const handleCopy = async () => {
    setCopied(true);
    await delay(300);
    setCopied(false);
  };

  // get qr code details
  const getQrCodeDetails = () => {
    setloading(true);
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.API_BASE_URL}/api/user/twoFactor`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === true || 200) {
          setqrcodeDetails(result.data);
          settwoFacEnable(result.two_fa);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  //enable two factor
  const enableTwofactor = () => {
    setloading(true);

    const formData = new FormData();
    formData.append("code", enableCode);
    formData.append("key", qrcodeDetails ? qrcodeDetails.secret : "");

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/createTwoFactor`,
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
          toast.success("qr code enabled successfully!!");
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  //disable two factor
  const disableTwofactor = () => {
    setloading(true);

    const formData = new FormData();
    formData.append("code", enableCode);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/disableTwoFactor`,
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
          toast.success("qr code disabled successfully!!");
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  useEffect(() => {
    getQrCodeDetails();
  }, []);

  if (loading) return <TwoFactorSkeleton />;

  return (
    <div>
      <h2 className="auc-primary-heading-with-extra-mb">
        {t("Two Factor Settings")}
      </h2>
      <div className="grid grid-cols-1 min-768:grid-cols-12 content-center">
        <div className="min-768:col-start-3 min-768:col-span-8 px-[20px] min-768:px-[52px] py-[40px] rounded-[8px] border border-auc-border-color flex flex-col items-center gap-[40px]">
          <div className="flex flex-col items-center gap-[24px]">
            <h2 className="text-[24px] min-768:text-[32px] min-1200:text-[40px] leading-[120%] font-semibold">
              {t("Authentication App")}
            </h2>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 232,
                width: "100%",
              }}
            >
              {qrcodeDetails && qrcodeDetails?.qrCodeUrl && (
                <div
                  className="w-[256px] h-[256px] bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url(${qrcodeDetails?.qrCodeUrl})` }}
                ></div>
              )}

            </div>
            <p className="text-[16px] leading-[170%] text-auc-text-color-800">
              {t(`Use the QR code or setup key on your Google Authenticator app to
              add your account. After the application is configured please enter
              the authentication code.`)}
            </p>
            {/* Copy Bar */}
            <Tooltip
              placement="top-end"
              content={`${copied ? "Copied" : "Copy"}`}
            >
              <div className="w-full flex items-center">
                <input
                  className="flex outline-auc-primary-color justify-center items-center gap-[10px] border text-auc-text-color-800 border-auc-border-color px-[16px] py-[19px] w-full h-[60px] rounded-l-[8px]"
                  value={qrcodeDetails ? qrcodeDetails.secret : ""}
                  disabled
                />
                <CopyToClipboard
                  text={qrcodeDetails ? qrcodeDetails.secret : ""}
                  onCopy={handleCopy}
                >
                  <button className="flex  w-[60px] p-[18px] items-start gap-[10px] rounded-r-[8px] bg-auc-secondary-color-700 hover:bg-auc-secondary-color transition-all ease-in-out duration-300">
                    {/* <Tooltip className="!top-0" content={`${copied ? "Copied" : "Copy"}`}> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4.14252 24H15.0574C17.1556 24 18.876 22.4258 19.145 20.4H19.8574C22.1414 20.4 24 18.5414 24 16.2575V4.14252C24 1.85856 22.1414 0 19.8575 0H8.94252C6.65856 0 4.8 1.85856 4.8 4.14252V4.8H4.14252C1.85856 4.8 0 6.65856 0 8.94252V19.8574C0 22.1414 1.85856 24 4.14252 24ZM7.2 4.14252C7.2 3.18168 7.98168 2.4 8.94252 2.4H19.8574C20.8183 2.4 21.6 3.18168 21.6 4.14252V16.2574C21.6 17.2183 20.8183 18 19.8575 18H19.2V8.94252C19.2 6.65856 17.3414 4.8 15.0575 4.8H7.2V4.14252ZM2.4 8.94252C2.4 7.98168 3.18168 7.2 4.14252 7.2H15.0574C16.0183 7.2 16.8 7.98168 16.8 8.94252V19.8574C16.8 20.8183 16.0183 21.6 15.0575 21.6H4.14252C3.18168 21.6 2.4 20.8183 2.4 19.8575V8.94252Z"
                        fill="white"
                      />
                    </svg>
                    {/* </Tooltip> */}
                  </button>
                </CopyToClipboard>
              </div>
            </Tooltip>
          </div>
          <form
            className="w-full"
            onSubmit={
              twoFacEnable && twoFacEnable == 1
                ? disableTwofactor
                : enableTwofactor
            }
          >
            <div className="flex flex-col items-center gap-[24px] w-full">
              <input
                className="flex outline-auc-primary-color justify-center items-center gap-[10px] border border-auc-border-color text-auc-gray-color px-[16px] py-[19px] w-full h-[60px] rounded-[8px] "
                type="text"
                autoComplete="off"
                name="authenticationCode"
                id="authenticationCode"
                onChange={(e) => {
                  setenableCode(e.target.value);
                }}
                placeholder="Authentication Code"
              />

              {twoFacEnable && twoFacEnable == 1 ? (
                <Button
                  styles={"auc-btn-primary w-full bg-auc-light-red-color"}
                  btnType="submit"
                  text={t("disable Two Factor Authenticator")}
                />
              ) : (
                <Button
                  styles={"auc-btn-primary w-full"}
                  btnType="submit"
                  text={t("Enable Two Factor Authenticator")}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
