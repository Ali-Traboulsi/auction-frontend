"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "../buttons/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { object, string, number, ref } from "yup";

import { useRouter } from "next/navigation";
import { hadleResetPassword } from "../../../utils/authApiFunctions";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [isUiLoaded, setisUiLoaded] = useState(false);

  const resetSchema = object({
    OTP: number().required(),
    password: string().required("Password is required"),
    password_confirmation: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const formik = useFormik({
    initialValues: {
      OTP: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: resetSchema,
    onSubmit: async (values) => {
      setloading(true);
      try {
        const res = await hadleResetPassword(
          values.OTP,
          values.password,
          values.password_confirmation
        );

        if (res.status === 200) {
          toast.success(res.message);
          router.push("/login");
        }

        if (res.status === 422) {
          toast.warn(res.error);
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
    <div className="flex p-[40px] flex-col items-center  rounded-[12px] bg-auc-white-color form-box-shadow">
      <h3 className="text-[18px] min-768:text-[24px] min-1200:text-[32px] leading-[130%] font-semibold ">
        Reset password{" "}
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
                htmlFor="OTP"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                OTP
              </label>
              <input
                className={`border px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] ${
                  formik.errors.OTP
                    ? "outline-auc-light-red-color border-auc-text-light-red-color"
                    : "outline-auc-primary-color border-auc-text-color-500 "
                }`}
                type="number"
                autoComplete="off"
                name="OTP"
                id="OTP"
                placeholder="Please enter your OTP"
                onChange={formik.handleChange}
                value={formik.values.OTP}
              />
              {formik.touched.OTP && formik.errors.OTP ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.OTP}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col gap-[8px] w-full">
              <label
                htmlFor="password"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                Password
              </label>
              <input
                className={`border px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] ${
                  formik.errors.password
                    ? "outline-auc-light-red-color border-auc-text-light-red-color"
                    : "outline-auc-primary-color border-auc-text-color-500 "
                }`}
                type="password"
                autoComplete="new-password"
                name="password"
                id="password"
                placeholder="Please enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col gap-[8px] w-full">
              <label
                htmlFor="password_confirmation"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                Confirm Password
              </label>
              <input
                className={`border px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] ${
                  formik.errors.password_confirmation
                    ? "outline-auc-light-red-color border-auc-text-light-red-color"
                    : "outline-auc-primary-color border-auc-text-color-500 "
                }`}
                type="password"
                autoComplete="new-password"
                name="password_confirmation"
                id="password_confirmation"
                placeholder="Please confirm your password"
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
              />
              {formik.touched.password_confirmation &&
              formik.errors.password_confirmation ? (
                <span className="capitalize text-auc-light-red-color">
                  {formik.errors.password_confirmation}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {/* Email Password Forget End */}
        <Button
          isdisabled={loading}
          text={"send OTP"}
          styles={"auc-btn-primary w-full"}
          btnType={"submit"}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
