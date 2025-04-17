"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../buttons/Button";
import { useFormik } from "formik";
import { object, string, number, date, InferType } from "yup";
import { useRouter } from "next/navigation";
import { hadleLoginApi } from "../../../utils/authApiFunctions";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import useGlobalStore from "../../store/GlobalStore";
import useLanguage from "../../hook/UseLanguage";
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUiLoaded, setUiLoaded] = useState(false);
  const t = useLanguage();
  const store = useGlobalStore();
  const passRef = useRef(null);


  const loginSchema = object({
    email: string().email().required(),
    password: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await hadleLoginApi(values.email, values.password);
        if (res.status === true || res.status === 200) {
          Cookies.set("user_token", `${res.data.token}`);
          Cookies.set("user_data", JSON.stringify(res.data.user));
          store.setUserData(res.data.user);
          toast.success("Logged in Successfully!");

          setLoading(false);
          if (res.data.user.kyc_status == 1 || 2) {
            router.replace("/dashboard");
            router.refresh();
          } else {
            router.replace("/dashboard/kyc");
            router.refresh();
          }
        } else {
          console.log("err", res);
          toast.error(
            res?.error?.message ? res?.error?.message : "Something went wrong"
          );
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        toast.error(
          e?.error?.message ? e?.error?.message : "Something went wrong"
        );
      }
    },
  });



  return (
    <div className="flex p-[40px] flex-col items-center  rounded-[12px] bg-auc-white-color form-box-shadow">
      <h3 className="text-[18px] min-768:text-[24px] min-1200:text-[32px] leading-[130%] font-semibold ">
        {t("Welcome Back! Please login")}
      </h3>

      {/* Form Start  */}
      <form
        // onSubmit={()=>signIn()}
        onSubmit={formik.handleSubmit}
        action=""
        className="flex flex-col justify-center items-center gap-[40px] rounded-[16px] w-full"
      >
        <div>{loading && <span className="text-red-500">{loading}</span>}</div>
        {/* Email Password Forget Start  */}
        <div className="w-full">
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <div className="flex flex-col gap-[8px] w-full">
              <label
                htmlFor="email"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                {t("Your Email")}
              </label>
              <input
                className={`border px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] ${formik.errors.email
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

            <div className="relative flex flex-col gap-[8px] w-full">
              <label
                htmlFor="password"
                className="text-[16px] font-medium leading-[150%] text-auc-text-color-900"
              >
                {t("Your Password")}
              </label>
              <input
                ref={passRef}
                className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px]"
                type="password"
                autoComplete="off"
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

              <button
                type="button"
                className="absolute top-[55px] right-[16px]"
                onClick={() => {
                  if (passRef.current.type === "password") {
                    passRef.current.type = "text";
                  } else {
                    passRef.current.type = "password";
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2476_21418)">
                    <path
                      d="M15.5131 6.27923C14.9112 5.29372 14.1521 4.4134 13.2657 3.67323L15.1324 1.80657C15.2538 1.68083 15.321 1.51243 15.3195 1.33763C15.318 1.16283 15.2479 0.995625 15.1243 0.87202C15.0007 0.748415 14.8335 0.678302 14.6587 0.676783C14.4839 0.675264 14.3155 0.74246 14.1897 0.863899L12.1597 2.89657C10.9013 2.14911 9.46267 1.75954 7.99906 1.7699C3.87172 1.7699 1.51972 4.59523 0.485058 6.27923C0.16541 6.79624 -0.00390625 7.39206 -0.00390625 7.9999C-0.00390625 8.60774 0.16541 9.20356 0.485058 9.72057C1.0869 10.7061 1.84605 11.5864 2.73239 12.3266L0.865724 14.1932C0.802051 14.2547 0.751263 14.3283 0.716323 14.4096C0.681384 14.491 0.662993 14.5784 0.662224 14.667C0.661455 14.7555 0.678323 14.8433 0.711843 14.9252C0.745364 15.0071 0.794866 15.0816 0.857461 15.1442C0.920056 15.2068 0.994491 15.2563 1.07642 15.2898C1.15835 15.3233 1.24614 15.3402 1.33466 15.3394C1.42318 15.3386 1.51066 15.3202 1.59199 15.2853C1.67333 15.2504 1.74689 15.1996 1.80839 15.1359L3.84306 13.1012C5.0999 13.8486 6.53684 14.2388 7.99906 14.2299C12.1264 14.2299 14.4784 11.4046 15.5131 9.72057C15.8327 9.20356 16.002 8.60774 16.002 7.9999C16.002 7.39206 15.8327 6.79624 15.5131 6.27923ZM1.62106 9.02257C1.43115 8.71526 1.33056 8.36115 1.33056 7.9999C1.33056 7.63865 1.43115 7.28454 1.62106 6.97723C2.51039 5.53323 4.52039 3.10323 7.99906 3.10323C9.10591 3.09703 10.1972 3.36379 11.1764 3.8799L9.83439 5.2219C9.19435 4.79697 8.427 4.60656 7.66255 4.683C6.8981 4.75943 6.18364 5.09799 5.64039 5.64123C5.09715 6.18448 4.75859 6.89894 4.68215 7.66339C4.60572 8.42784 4.79613 9.19519 5.22106 9.83523L3.68106 11.3752C2.86446 10.715 2.16762 9.9192 1.62106 9.02257ZM9.99906 7.9999C9.99906 8.53033 9.78834 9.03904 9.41327 9.41411C9.0382 9.78919 8.52949 9.9999 7.99906 9.9999C7.70207 9.99875 7.40919 9.93037 7.14239 9.7999L9.79906 7.14323C9.92953 7.41003 9.99791 7.70291 9.99906 7.9999ZM5.99906 7.9999C5.99906 7.46947 6.20977 6.96076 6.58484 6.58569C6.95992 6.21061 7.46863 5.9999 7.99906 5.9999C8.29605 6.00105 8.58893 6.06943 8.85572 6.1999L6.19906 8.85657C6.06858 8.58977 6.00021 8.29689 5.99906 7.9999ZM14.3771 9.02257C13.4877 10.4666 11.4777 12.8966 7.99906 12.8966C6.89221 12.9028 5.8009 12.636 4.82172 12.1199L6.16372 10.7779C6.80377 11.2028 7.57112 11.3932 8.33557 11.3168C9.10002 11.2404 9.81448 10.9018 10.3577 10.3586C10.901 9.81532 11.2395 9.10086 11.316 8.33641C11.3924 7.57196 11.202 6.80461 10.7771 6.16457L12.3171 4.62457C13.1337 5.28475 13.8305 6.0806 14.3771 6.97723C14.567 7.28454 14.6676 7.63865 14.6676 7.9999C14.6676 8.36115 14.567 8.71526 14.3771 9.02257Z"
                      fill="#999999"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2476_21418">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[10px]">
            <div className="flex items-center gap-[8px] ">
              <input
                type="checkbox"
                id="checkbox"
                onChange={(e) => {
                }}
              />
              <label
                htmlFor="checkbox"
                className="text-[16px] font-normal leading-[170%] text-auc-text-color-900"
              >
                {t("Remember Me")}
              </label>
            </div>
            <Link
              href={"/send-otp"}
              className="text-[16px] font-normal leading-[170%] text-auc-primary-color-900 hover:text-auc-primary-hover-color transition-all ease-in-out duration-300"
            >
              {t("Forget Password?")}
            </Link>
          </div>
        </div>
        {/* Email Password Forget End */}
        <Button
          text={loading ? "Logging" : "Login"}
          styles={"auc-btn-primary w-full mb-[48px]"}
          btnType={"submit"}
          isLoading={loading}
          isdisabled={loading}
        />
      </form>
      {/* Form End */}
      <p className="text-center text-[18px] font-normal leading-[120%] text-auc-text-color-900">
        {t("Don't have an account?")}
        <Link href={"/register"}>
          <span className="ml-4 text-auc-primary-color-900 hover:text-auc-primary-hover-color font-semibold transition-all ease-in-out">
            {t("Create New Account")}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
