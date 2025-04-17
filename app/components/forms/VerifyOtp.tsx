"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "../buttons/Button";
import { useFormik } from "formik";
import { object, string, number, date, InferType } from "yup";
import { useRouter } from "next/navigation";
import { hadleLoginApi, hadleOTP } from "../../../utils/authApiFunctions";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import useLanguage from "../../hook/UseLanguage";
import { checkOTPForMail } from "../../../utils/ApiClientSideFunctions";

const VerifyOtp = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [isUiLoaded, setisUiLoaded] = useState(false);
  const hasToken = Cookies.get("user_token") || null;
  const t = useLanguage();

  const loginSchema = object({
    otp: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setloading(true);
        const res = await checkOTPForMail(values.otp);

        console.log("check res from veruify otp page", res);

        if (res?.status == true) {
          router.replace('/dashboard');
        }
        else if (res?.status == false) {
          toast.error(res.error?.message);
        }
        else {
          toast.error("something went wrong!");
        }

        setloading(false);
      } catch (e) {
        console.log("error", e);
        toast.error("something went wrong!");
        setloading(false);
      }
    },
  });

  useEffect(() => {
    setisUiLoaded(true);
  }, []);

  if (!isUiLoaded) {
    return null;
  }

  return (
    <div className="flex p-[40px] flex-col items-center rounded-[12px] bg-auc-white-color form-box-shadow">
      <h3 className="text-[18px] min-768:text-[24px] min-1200:text-[32px] leading-[130%] font-semibold mb-4">
      Please enter the OTP sent to your email.{" "}
      </h3>

      {/* Form Start  */}
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="flex flex-col justify-center items-center gap-[40px] rounded-[16px] w-full"
      >
        {/* otp Password Forget Start  */}
        <div className="w-full">
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <div className="flex flex-col gap-[8px] w-full">
              <label
                htmlFor="otp"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                OTP
              </label>
              <input
                className={`border px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] ${formik.errors.otp
                  ? "outline-auc-light-red-color border-auc-text-light-red-color"
                  : "outline-auc-primary-color border-auc-text-color-500 "
                  }`}
                type="text"
                autoComplete="off"
                name="otp"
                id="otp"
                placeholder="OTP"
                onChange={formik.handleChange}
                value={formik.values.otp}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.otp}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {/* otp Password Forget End */}
        <Button
          isLoading={loading}
          isdisabled={loading}
          text={loading ? t("verifying... OTP") : t("Verify OTP")}
          styles={"auc-btn-primary w-full"}
          btnType={"submit"}
        />
      </form>
    </div>
  );
};

export default VerifyOtp;
