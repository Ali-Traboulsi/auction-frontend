"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import useLanguage from "../../hook/UseLanguage";

export default function SubscribeSection() {
  const [loading, setloading] = useState(false);
  const t = useLanguage();

  // validation
  const createAuctionSchema = object({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: createAuctionSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append(`email`, values?.email);

      var requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(`${process.env.API_BASE_URL}/api/subscriber/submit`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === true) {
            toast.success(res.success);
            formik.resetForm();
          }
          if (res.status === false) {
            toast.warning(res.error?.message);
          }
          setloading(false);
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("Something went wrong");
          setloading(false);
        });
    },
  });

  return (
    <div className="bg-auc-primary-color py-[30px]  min-992:py-[40px]">
      <div className="auc-container">
        <div className="grid min-768:grid-cols-2 items-center">
          <div className="mb-[24px]  min-768:mb-[0]">
            <h2 className="text-[24px] min-992:text-[32px] min-1440:text-[48px]  text-white uppercase text-center min-768:text-left">
             {t("SIGN UP TO NEWSLATTER")}
            </h2>
          </div>
          <div className="flex  min-768:justify-center flex-wrap flex-col items-center min-768:items-end">
            <div>
              <form
                onSubmit={formik?.handleSubmit}
                className="flex items-center "
              >
                <input
                  placeholder="Enter your email"
                  type="text"
                  value={formik?.values?.email}
                  name="email"
                  onChange={formik?.handleChange}
                  className="py-[8px] min-992:py-[14px] px-[20px] rounded-tl-[8px] min-768:min-w-[260px] rounded-bl-[8px] outline-0"
                />

                <button
                  disabled={loading && formik?.values?.email === ""}
                  className="py-[7px] min-992:py-[13px] px-[20px] text-[16px] min-768:text-[18px] rounded-tr-[8px] rounded-br-[8px] bg-auc-text-color-900 hover:bg-auc-text-color-800 transition-all text-white"
                  type="submit"
                >
                  Send
                  {loading && (
                    <div role="status" className="absolute right-4">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-auc-secondary-color"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </button>
              </form>
              {formik.touched.email && formik.errors.email ? (
                <div className="capitalize text-auc-light-red-color">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
