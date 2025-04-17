"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "../buttons/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { object, string, number, date, InferType } from "yup";
// import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { hadleLoginApi, hadleOTP } from "../../../utils/authApiFunctions";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import useLanguage from "../../hook/UseLanguage";

const SendOtp = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [isUiLoaded, setisUiLoaded] = useState(false);
  const hasToken = Cookies.get("user_token") || null;
  const t = useLanguage();

  const loginSchema = object({
    email: string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setloading(true);
        const res = await hadleOTP(values.email);
        if (res.status === 200) {
          toast.success(res.message);
          router.push("/reset-password");
        } else {
          console.log("err", res);
          toast.error(res.error);
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
        Please enter your email{" "}
      </h3>

      {/* Form Start  */}
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="flex flex-col justify-center items-center gap-[40px] rounded-[16px] w-full"
      >
        {/* Email Password Forget Start  */}
        <div className="w-full">
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <div className="flex flex-col gap-[8px] w-full">
              <label
                htmlFor="email"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                Your Email
              </label>
              <input
                className={`border px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] ${
                  formik.errors.email
                    ? "outline-auc-light-red-color border-auc-text-light-red-color"
                    : "outline-auc-primary-color border-auc-text-color-500 "
                }`}
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                placeholder="Please enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {/* Email Password Forget End */}
        <Button
          isLoading={loading}
          isdisabled={loading}
          text={loading ? t("sending... OTP") : t("send OTP")}
          styles={"auc-btn-primary w-full"}
          btnType={"submit"}
        />
      </form>
    </div>
  );
};

export default SendOtp;
