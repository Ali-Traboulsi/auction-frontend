import React from "react";
import AuctionCard from "../../cards/AuctionCard";

export default function MoreFromVendor({ data }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[40px]">
      {data &&
        data.map((auc) => (
          <AuctionCard
            key={auc.id}
            item_id={auc.id}
            img={auc.image}
            title={auc.title}
            // ratings="10/50"
            price={auc.price}
            time={auc.end_date}
            smCard={false}
            slug={auc.slug}
            isWish={auc.is_wish}
            is_own={auc.is_own}
          />
        ))}
    </div>
  );
}
