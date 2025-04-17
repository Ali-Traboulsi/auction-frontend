"use client";
import React from "react";
import Image from "next/image";
import TitleBox from "../TitleBox";
import AucCatCard from "../cards/AucCatCard";
import { extractBaseUrlUntilImages } from "../../helpers/helpers";
import useLanguage from "../../hook/UseLanguage";

export default function AuctionWinner({ page_data }) {
  const t = useLanguage();

  // generate img
  const imageUrl = page_data?.image;
  const baseUrlUntilImages = extractBaseUrlUntilImages(imageUrl);

  return (
    <div className="relative">
      <Image
        width={200}
        height={200}
        src={`/assets/img/triangle-shape.png`}
        alt="shape"
        className="absolute top-0 left-0 -z-10"
      />
      <Image
        width={337}
        height={173}
        src={`/assets/img/right-shape.png`}
        alt="shape"
        className="absolute bottom-0 right-0 -z-10"
      />
      <div className="auc-container pb-[120px] pt-[110px] relative">
        {/* title box */}
        <TitleBox
          title={page_data?.content?.heading}
          subtitle={page_data?.content?.sub_heading}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {page_data?.sub_content.map((item, index) => (
            <AucCatCard
              key={index}
              img={`${baseUrlUntilImages}/${item.image}`}
              title={item.title}
              auctionId={`ID: ${item.id}`}
              awardCount={`${item.number} ${t("Wining")}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
