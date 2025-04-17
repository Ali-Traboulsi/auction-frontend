"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { useFormik } from "formik";
import { object, number,} from "yup";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useLanguage from "../hook/UseLanguage";
import Button from "../components/buttons/Button";
import Image from "next/image";
import { hadleVerifyEmail } from "../../utils/authApiFunctions";

const EmailVerify = ({}) => {
  const router = useRouter();
  const t = useLanguage();
  const [loading, setLoading] = useState(false);

  const regSchema = object({
    code: number().required(),
  });

  const formik = useFormik({
    initialValues: {
      code: null,
    },
    validationSchema: regSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await hadleVerifyEmail(values.code);
        if (res.status === true || res.status === 200) {
          toast.success("Your email is verified.");
          router.replace("/login");
          router.refresh();
          setLoading(false);
        } else {
          toast.error("something went wrong!");
          setLoading(false);
        }

      } catch (e) {
        console.log("err", e);
        toast.error("something went wrong!");
        setLoading(false);
      }
    },
  });

  return (
    <div className="auc-container">
      <div className="grid grid-cols-12 items-center pt-[100px] max-768:pt-[50px] pb-[120px] max-768:pb-[60px]">
        <Image
          src={"/assets/img/login-register.png"}
          width={803}
          height={771}
          className="col-span-6  relative -left-[200px] max-1920:-left-[70px] max-1440:-left-[50px] max-1200:-left-[40px] max-1024:hidden"
          alt={""}
        />
        <div className="col-span-6 max-1024:col-span-8 max-1024:col-start-3 max-992:col-span-10 max-992:col-start-2 max-768:col-span-12 ">
          <div className="flex p-[40px] flex-col items-center gap-[48px] rounded-[12px] bg-auc-white-color form-box-shadow">
            <h3 className="text-[18px] min-768:text-[24px] min-1200:text-[32px] leading-[130%] font-semibold ">
              {t("Verify Your Email")}
            </h3>
            {/* Form Start  */}
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-center items-center gap-[40px] rounded-[16px] w-full"
            >
              {/* verify email  */}
              <div className="w-full">
                <div className="flex flex-col justify-center items-center gap-[24px] w-full">
                  {/* code  */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <label
                      htmlFor="code"
                      className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
                    >
                      {t("Enter your verified code")}
                    </label>
                    <input
                      className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px]"
                      type="number"
                      autoComplete="off"
                      name="code"
                      onChange={formik.handleChange}
                      value={formik.values?.code}
                      id="code"
                      placeholder="Enter your verified code"
                    />
                    {formik.touched?.code && formik.errors?.code ? (
                      <span className="capitalize text-auc-light-red-color">
                        {/* {formik.errors.code} */}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* Email Password Forget End */}
              <Button
                isLoading={loading}
                isdisabled={loading}
                text={loading ? t("Loading..") : t("submit")}
                styles={"auc-btn-primary w-full"}
                btnType={"submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
