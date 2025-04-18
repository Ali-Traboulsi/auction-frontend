"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import Button from "../buttons/Button";
import { extractVideoIdFromUrl } from "../../helpers/helpers";
import useLanguage from "../../hook/UseLanguage";

export default function CallToActionSection({ page_data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  const videoLink = page_data.content.video_link;
  const videoId = extractVideoIdFromUrl(videoLink);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const t = useLanguage();

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);
  if (!isDomLoaded) {
    return;
  }

  return (
    <div className="bg-auc-primary-color-200  relative">
      <Image
        src={`/assets/img/call-shape.png`}
        width={300}
        height={200}
        alt="shape"
        className="absolute bottom-0 left-0"
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex justify-end pb-[120px] pt-[110px]">
          <div
            suppressHydrationWarning
            className="wow fadeInUp lg:w-[600px] px-8"
          >
            <h2 suppressHydrationWarning className="wow fadeInUp mb-[32px]">
              {page_data.content.heading}
            </h2>
            <p
              suppressHydrationWarning
              className="wow fadeInUp mb-[60px]"
              dangerouslySetInnerHTML={{
                __html: page_data.content.description,
              }}
            ></p>
            <Button
              text={t("Free Registration")}
              styles={"auc-btn-primary !inline"}
              isLink={true}
              href="/register"
            />
          </div>
        </div>

        <div className="relative">
          <button className="vdo-btn" onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="144"
              height="144"
              className="w-[80px] h-[80px] min-1440:w-[144px] min-1440:h-[144px]"
              viewBox="0 0 144 144"
              fill="none"
            >
              <g clipPath="url(#clip0_785_1230)">
                <path
                  d="M71.9987 0.571777C32.5499 0.571777 0.570312 32.5514 0.570312 72.0002C0.570312 111.449 32.5499 143.429 71.9987 143.429C111.448 143.429 143.427 111.449 143.427 72.0002C143.385 32.569 111.43 0.613929 71.9987 0.571777ZM102.08 74.2761C101.586 75.268 100.782 76.0722 99.7895 76.5666V76.592L58.9733 97.0003C56.4526 98.2597 53.3884 97.2376 52.1286 94.7169C51.7705 94.0003 51.586 93.2093 51.5905 92.4084V51.5923C51.5893 48.7744 53.8724 46.4892 56.6902 46.4877C57.4827 46.4874 58.2645 46.6716 58.9733 47.0258L99.7895 67.4341C102.311 68.6908 103.337 71.7542 102.08 74.2761Z"
                  fill="#008080"
                />
                <path
                  d="M52 53.2859V90.7145C52 94.9373 56.4225 97.7014 60.2183 95.8509L98.6066 77.1366C102.887 75.05 102.887 68.9504 98.6066 66.8638L60.2183 48.1495C56.4225 46.299 52 49.0631 52 53.2859Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_785_1230">
                  <rect
                    width="142.857"
                    height="142.857"
                    fill="white"
                    transform="translate(0.570312 0.571289)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
          {page_data?.image && (
            <Image
              src={page_data?.image}
              width={960}
              height={800}
              alt="shape"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      {/*<ModalVideo*/}
      {/*  channel="youtube"*/}
      {/*  isOpen={isOpen}*/}
      {/*  videoId={videoId}*/}
      {/*  onClose={closeModal}*/}
      {/*/>*/}
    </div>
  );
}
