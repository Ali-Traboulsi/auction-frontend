"use client";
import React, { Suspense, useEffect, useState } from "react";
import { cookies } from "next/headers";
import { FrontendPageSkeleton } from "../skeleton/skeleton";
import BreadCrumb from "../BreadCrumb";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import TitleBox from "../TitleBox";

const FAQPage = () => {
  const [loading, setloading] = useState(false);
  const [faqList, setfaqList] = useState(null);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // fetch country list
  const fetchFaqList = () => {
    setloading(true);
    var requestOptions = {
      method: "GET",
    };

    fetch(`${process.env.API_BASE_URL}/api/faq`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setfaqList(result?.data);
        setloading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchFaqList();
  }, []);

  if (loading) return <FrontendPageSkeleton />;

  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <BreadCrumb currentPage={"FAQ page"} />

      <div className="auc-container py-[80px]  min-992:py-[120px]">
        <TitleBox
          title={faqList?.faq?.content?.heading}
          subtitle={faqList?.faq?.content?.sub_heading}
        />

        {faqList &&
          faqList?.faq?.sub_content?.map((faq, index) => (
            <Accordion
              key={index}
              open={open === index}
              icon={<Icon id={index} open={open} />}
            >
              <AccordionHeader
                className="text-[20px]  min-992:text-[24px] text-auc-text-color-900"
                onClick={() => handleOpen(index)}
              >
                {faq?.question}
              </AccordionHeader>
              <AccordionBody className="text-[14px]  min-992:text-[16px] text-auc-text-color-800">
                {faq?.answer}
              </AccordionBody>
            </Accordion>
          ))}
      </div>
    </Suspense>
  );
};

export default FAQPage;

export const dynamic = "force-dynamic";
