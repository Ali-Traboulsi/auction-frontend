"use client";

import React, { useCallback, useEffect, useState } from "react";
import ChatCard from "../../cards/ChatCard";
import Button from "../../buttons/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string, mixed } from "yup";
import Pagination from "../../pagination/Pagination";
import useLanguage from "../../../hook/UseLanguage";
import { TableSkeleton } from "../../skeleton/skeleton";

const ViewTicket = ({ ticket_num }) => {
  const router = useRouter();
  const token = Cookies.get("user_token");
  const [loading, setloading] = useState(false);
  const [isFormSubmitting, setisFormSubmitting] = useState(false);
  const [allMessages, setallMessages] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setperPage] = useState(1);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState(null);

  const t = useLanguage();

  const ticketSchema = object({
    message: string().required(),
  });

  const handlePageCount = (pg) => {
    if (pg === "&laquo; Previous") {
      if (currentPage !== 1) {
        setPage(pg - 1);
      }
    } else if (pg === "Next &raquo;") {
      if (lastPage !== pg) {
        setPage(pg + 1);
      }
    } else {
      setPage(pg);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: "",
      file: "" as File | string,
    },
    validationSchema: ticketSchema,
    onSubmit: async (values) => {
      submitReply(values);
    },
  });

  const submitReply = (values) => {
    const formData = new FormData();
    formData.append("message", values.message);
    if (values?.file) {
      formData.append("file", values.file);
    }

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    setisFormSubmitting(true);
    fetch(
      `${process.env.API_BASE_URL}/api/user/reply/ticket/${ticket_num}`,
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
          toast.success("ticket created Successfully!");
          getAllMessages();
        }
        setisFormSubmitting(false);
      })
      .catch((error) => {
        console.log("error", error);
        setisFormSubmitting(false);
      });
  };

  const getAllMessages = useCallback(() => {
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setloading(true);
    fetch(
      `${process.env.API_BASE_URL}/api/user/support/ticket/messages/${ticket_num}?page=${page}`,
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
          setallMessages(result.data.messages.data);
          setlastPage(result.data.messages.meta.last_page);
          setperPage(result.data.messages.meta.per_page);
          setcurrentPage(result.data.messages.meta.current_page);
          setPageLinks(result.data.messages.meta.links);
          settotalItems(result.data.messages.meta.total);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  }, [page, router, ticket_num, token]);

  useEffect(() => {
    getAllMessages();
  }, [page, getAllMessages]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <h2 className="auc-primary-heading-with-extra-mb !mb-[48px]">
        {t("View Ticket")}
      </h2>
      <div className="mb-[24px] flex flex-col min-768:flex-row gap-[12px] justify-between min-768:items-center">
        <div className="flex flex-col-reverse min-768:flex-row gap-[12px] min-768:items-center h-[42px] ">
          <h2 className="text-[20px] min-768:text-[24px] min-1200:text-[32px] font-semibold leading-[130%]">
            [{t("Ticket")} #{ticket_num}]
          </h2>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
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

        <Button
          isLoading={isFormSubmitting}
          isdisabled={isFormSubmitting}
          btnType="submit"
          text={isFormSubmitting ? t("Processing...") : t("Reply")}
          styles={"auc-btn-primary mt-[32px] w-full"}
        />
      </form>

      {/* Chat Cards  */}
      <div className="flex flex-col gap-[24px] items-start mt-[60px]">
        {allMessages &&
          allMessages.map((mess) => (
            <ChatCard
              key={mess.id}
              card_data={mess}
              isAttached={true}
              userImg={"/assets/img/user1.png"}
            />
          ))}
      </div>
      <Pagination
        current_page={currentPage}
        links={pageLinks}
        total_items={totalItems}
        per_page={perPage}
        handlePageCount={handlePageCount}
      />
    </div>
  );
};

export default ViewTicket;
