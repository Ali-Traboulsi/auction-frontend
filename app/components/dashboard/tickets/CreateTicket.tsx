"use client";

import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import NiceSelect from "../../NiceSelect/NiceSelect";
import { useFormik } from "formik";
import { object, string, mixed } from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useLanguage from "../../../hook/UseLanguage";

const CreateTicket = () => {
  const router = useRouter();
  const token = Cookies.get("user_token");
  const [loading, setloading] = useState(false);
  const [isUiLoaded, setIsuiLoaded] = useState(false);
  const t = useLanguage();
  const ticketSchema = object({
    subject: string().required(),
    message: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      subject: "",
      priority: "",
      message: "",
      file: "" as File | string,
    },
    validationSchema: ticketSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("subject", formik.values.subject);
      formData.append("priority", formik.values.priority);
      formData.append("message", formik.values.message);
      if (formik?.values?.file) {
        formData.append("file", formik.values.file);
      }

      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      setloading(true);
      fetch(
        `${process.env.API_BASE_URL}/api/user/open/support/ticket`,
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
            const fileInput = document.getElementById(
              "msg_img_Id"
            ) as HTMLInputElement;
            if (fileInput) {
              fileInput.value = ""; // Clear the file input value
            }
            formik.resetForm();
            toast.success("ticket open Successfully!");
            router.push("/dashboard/tickets");
          }
          setloading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
        });
    },
  });

  const priorityOptions = [
    {
      label: "High",
      value: "High",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "Low",
      value: "Low",
    },
  ];

  useEffect(() => {
    setIsuiLoaded(true);
  }, []);

  if (!isUiLoaded) return null;
  return (
    <div>
      <h2 className="auc-primary-heading">{t("Create Tickets")}</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* grid start  */}
        <div className="grid grid-cols-1 min-768:grid-cols-2 gap-[28px]">
          {/* Subject */}
          <div className="w-full ">
            <label htmlFor="subject">{t("Subject")}</label>
            <input
              className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="text"
              autoComplete="off"
              name="subject"
              id="subject"
              value={formik.values.subject}
              placeholder="Subject"
              onChange={formik.handleChange}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.subject}
              </span>
            ) : null}
          </div>
          {/* Priority  */}
          <div className="w-full">
            <label htmlFor="priority">{t("Priority")}</label>
            <div className="relative mt-[16px]">
              <NiceSelect
                options={priorityOptions}
                defaultValue={formik.values.priority}
                onChange={(e) => {
                  formik.setFieldValue("priority", e.value);
                }}
                wrapperClass=""
              />
            </div>
            {formik.touched.priority && formik.errors.priority ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.priority}
              </span>
            ) : null}
          </div>
          {/* Text Area  */}
          <div className="col-span-1 min-768:col-span-2">
            <label htmlFor="productDescriptionBox">{t("Message")}</label>
            <textarea
              className=" border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[144px] rounded-[8px] mt-[16px]"
              autoComplete="off"
              name="message"
              value={formik.values.message}
              id="productDescriptionBox"
              placeholder="Type here"
              onChange={formik.handleChange}
            />
            {formik.touched.message && formik.errors.message ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.message}
              </span>
            ) : null}
          </div>

          <div className="w-full ">
            <label className="mb-[16px] block" htmlFor="file_img">
              {t("Choose file")}
            </label>
            <input
              id="file_img"
              className="hidden"
              type="file"
              autoComplete="off"
              name="file_img"
              onChange={(e) => {
                formik.setFieldValue("file", e.target.files[0]);
              }}
            />
            <div className="flex items-center gap-4">
              <label
                className="w-[140px] flex justify-center items-center gap-[10px] bg-auc-secondary-color text-auc-text-color-900 py-[8px] px-[10px] cursor-pointer rounded-[4px]"
                htmlFor="file_img"
              >
                {t("Choose file")}
              </label>

              <span className="text-[18px] font-regular leading-[160%] text-auc-text-color-800">
                {formik.values.file instanceof File
                  ? formik?.values?.file?.name
                  : "No file choosen"}
              </span>
            </div>

            {formik.touched.file && formik.errors.file ? (
              <span className="capitalize text-auc-light-red-color">
                {formik.errors.file}
              </span>
            ) : null}
          </div>
        </div>
        {/* grid end */}
        <Button
          isLoading={loading}
          isdisabled={loading}
          btnType="submit"
          text={loading ? t("Submitting...") : t("Submit Ticket")}
          styles={"auc-btn-primary mt-[32px] w-full"}
        />
      </form>
    </div>
  );
};

export default CreateTicket;
