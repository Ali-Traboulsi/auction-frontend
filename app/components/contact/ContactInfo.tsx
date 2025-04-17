"use client";
import Image from "next/image";
import React from "react";
import useLanguage from "../../hook/UseLanguage";

export default function ContactInfo({ contact_data }) {
  const t = useLanguage();

  return (
    <>
      <h3 className="mb-[30px]">{contact_data.data.content.heading}</h3>

      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-wrap items-center gap-4 bg-auc-text-color-300 p-4 rounded-lg">
          <Image
            src={`/assets/icons/contact-icon1.png`}
            width={110}
            height={110}
            alt="icon"
            className="w-[60px] lg:w-[110px]"
          />
          <div>
            <h5 className="font-medium text-[24px] capitalize mb-[10px]">
              {t("Email Address")}
            </h5>
            {contact_data.data.email.map((email, index) => (
              <a
                key={index}
                href={`mailto:${email}`}
                className="block text-[18px] text-auc-text-color-800 hover:text-auc-primary-color"
              >
                {email}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-auc-text-color-300 p-4 rounded-lg">
          <Image
            src={`/assets/icons/contact-icon2.png`}
            width={110}
            height={110}
            alt="icon"
            className="w-[60px] lg:w-[110px]"
          />
          <div>
            <h5 className="font-medium text-[24px] capitalize mb-[10px]">
              {t("Phone Number")}
            </h5>
            {contact_data.data.phone.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone}`}
                className="block text-[18px] text-auc-text-color-800 hover:text-auc-primary-color"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="flex  items-center gap-4 bg-auc-text-color-300 p-4 rounded-lg">
          <Image
            src={`/assets/icons/contact-icon3.png`}
            width={110}
            height={110}
            alt="icon"
            className="w-[60px] lg:w-[110px]"
          />
          <div>
            <h5 className="font-medium text-[24px] capitalize mb-[10px]">
              {t("Our Head Office")}
            </h5>
            <span className="block text-[18px] text-auc-text-color-80">
              {contact_data.data.content.address}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
