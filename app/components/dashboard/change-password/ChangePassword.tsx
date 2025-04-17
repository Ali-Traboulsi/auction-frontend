"use client";
import React, { useEffect, useState } from "react";
import Button from "../../buttons/Button";
import { useFormik } from "formik";
import { object, string, number, date, InferType, mixed } from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useLanguage from "../../../hook/UseLanguage";

const ChangePassword = () => {
  const [loading, setloading] = useState(false);
  const [isFormSubmitting, setisFormSubmitting] = useState(false);
  const router = useRouter();
  const token = Cookies.get("user_token");
  const t = useLanguage();

  // validation
  const passwordSchema = object({
    old_pass: string().required(),
    password: string().required(),
    password_confirmation: string().required(),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      old_pass: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      updatePassword(values);
    },
  });

  // updatePassword
  const updatePassword = (values) => {
    const formData = new FormData();
    formData.append("old_pass", values.old_pass);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);

    setisFormSubmitting(true);
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(
      `${process.env.API_BASE_URL}/api/user/change-password`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 401) {
          Cookies.remove("user_token");
          router.replace("/login");
          router.refresh();
        }
        if (result.status === false) {
          {
            result?.error?.password?.map((err, index) => toast.warning(err));
          }
        }  
        else if(result.status == 404) {
          toast.warning(result?.message);
        }
        else {
          formik.resetForm();
          toast.success(result?.message);
        }

        setisFormSubmitting(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Something went wrong!");
        setisFormSubmitting(false);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="auc-primary-heading-with-extra-mb">
        {t("Change Password")}
      </h2>
      <div className="flex flex-col items-start gap-[32px] p-[40px] min-768:w-[508px] mx-auto rounded-[12px] border border-auc-gray-color bg-auc-white-color">
        <div className="flex w-full py-[29px] justify-center items-center gap-[10px] rounded-[4px] bg-auc-white-smoke-color">
          <h2 className="text-[20px] min-768:text-[24px] min-1200:text-[32px] font-semibold">
            {t("Change Password")}
          </h2>
        </div>
        <div className="w-full flex flex-col items-center gap-[32px]">
          {/* Old Password */}
          <div className="w-full">
            <label htmlFor="oldPassword"> {t("Old Password")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="password"
              autoComplete="off"
              name="old_pass"
              onChange={formik.handleChange}
              value={formik.values.old_pass}
              id="oldPassword"
              placeholder="Old Password"
            />
            {formik.touched.old_pass && formik.errors.old_pass ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.old_pass}
              </span>
            ) : null}
          </div>
          {/* New Password */}
          <div className="w-full">
            <label htmlFor="newPassword"> {t("New Password")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="password"
              autoComplete="off"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              id="newPassword"
              placeholder="New Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          {/* Confirm New Password */}
          <div className="w-full">
            <label htmlFor="confirmNewPassword">
              {t("Confirm New Password")}{" "}
            </label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="password"
              autoComplete="off"
              name="password_confirmation"
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              id="confirmNewPassword"
              placeholder="Confirm New Password"
            />
            {formik.touched.password_confirmation &&
            formik.errors.password_confirmation ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.password_confirmation}
              </span>
            ) : null}
          </div>

          <Button
            isLoading={isFormSubmitting}
            isdisabled={isFormSubmitting}
            btnType="submit"
            text={isFormSubmitting ? t("Updating..") : t("Confirm")}
            styles={"auc-btn-primary w-full"}
          />
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
