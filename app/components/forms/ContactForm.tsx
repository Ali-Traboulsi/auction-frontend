"use client";
import React, { useState } from "react";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import Button from "../buttons/Button";
import useLanguage from "../../hook/UseLanguage";

export default function ContactForm() {
  const router = useRouter();
  const t = useLanguage();

  const [loading, setLoading] = useState(false);

  const contactSchema = object({
    name: string().required(),
    email: string().email().required(),
    subject: string().required(),
    message: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("subject", values.subject);
      formdata.append("message", values.message);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      setLoading(true);

      fetch(`${process.env.API_BASE_URL}/api/contact`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === true || res.status === 200) {
            toast.success("Message sent Successfully!");
            formik.resetForm();
          } else if (res.status === 401) {
            Cookies.remove("user_token");
            router.replace("/login");
            router.refresh();
          } else {
            toast.error("something went wrong!");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("something went wrong!");
          setLoading(false);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="mb-[30px] capitalize">{t("feel free to message us")}</h3>
      <div className="flex flex-wrap w-full gap-[20px]">
        <div className="flex flex-col gap-[8px] w-full">
          <input
            className={`border px-[24px] py-[12px]  w-full h-[60px] rounded-[8px] ${
              formik.errors.name
                ? "outline-auc-light-red-color border-auc-text-light-red-color"
                : "outline-auc-primary-color border-auc-text-color-500 "
            }`}
            type="text"
            autoComplete="off"
            name="name"
            id="name"
            placeholder="Please enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <span className="capitalize text-auc-light-red-color">
              {formik.errors.name}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px] w-full">
          <input
            className={`border px-[24px] py-[12px]  w-full h-[60px] rounded-[8px] ${
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

        <div className="flex flex-col gap-[8px] w-full">
          <input
            className={`border px-[24px] py-[12px]  w-full h-[60px] rounded-[8px] ${
              formik.errors.subject
                ? "outline-auc-light-red-color border-auc-text-light-red-color"
                : "outline-auc-primary-color border-auc-text-color-500 "
            }`}
            type="text"
            autoComplete="off"
            name="subject"
            id="subject"
            placeholder="Subject"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
          {formik.touched.subject && formik.errors.subject ? (
            <span className="capitalize text-auc-light-red-color">
              {formik.errors.subject}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px] w-full">
          <textarea
            rows={5}
            className={`border px-[24px] py-[12px]  w-full  rounded-[8px] ${
              formik.errors.message
                ? "outline-auc-light-red-color border-auc-text-light-red-color"
                : "outline-auc-primary-color border-auc-text-color-500 "
            }`}
            name="message"
            id="message"
            placeholder="Message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <span className="capitalize text-auc-light-red-color">
              {formik.errors.message}
            </span>
          ) : null}
        </div>

        <Button
          isLoading={loading}
          isdisabled={loading}
          text={`${loading ? t("Sending Message..") : t("Send Message")}`}
          styles={"auc-btn-primary w-full"}
          btnType={"submit"}
        />
      </div>
    </form>
  );
}
