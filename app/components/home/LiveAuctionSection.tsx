"use client"
import React from "react";
import TitleBox from "../TitleBox";
import AuctionCard from "../cards/AuctionCard";
import Button from "../buttons/Button";
import useLanguage from "../../hook/UseLanguage";

export default function LiveAuctionSection({ page_data, title, subtitle }) {
  const t = useLanguage();
  return (
    <div className="pb-[120px] pt-[110px] bg-white">
      <div className="auc-container">
        <TitleBox title={title} subtitle={subtitle} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-[60px]">
          {page_data.map((data, index) => (
            <div
              key={index}
              suppressHydrationWarning
              className="wow fadeInUp"
              data-wow-delay=".1s"
            >
              <AuctionCard
                item_id={data.id}
                img={data.image}
                title={data.title}
                ratings={data.ratings}
                price={data.price}
                time={data.end_date}
                smCard={false}
                currency={data.currency}
                slug={data.slug}
                isWish={data.is_wish}
                is_own={data.is_own}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            isLink={true}
            href="/product"
            text={t("View All Live Auction")}
            styles={"auc-btn-primary-outline !py-[16px]"}
          />
        </div>
      </div>
    </div>
  );
}
