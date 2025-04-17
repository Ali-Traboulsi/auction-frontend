import React from "react";
import AuctionCard from "../cards/AuctionCard";
export default async function ProductGrid({ product_list }) {
  return (
    <>
      {product_list &&
        product_list.map((item, index) => (
          <div
            key={index}
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay=".1s"
          >
            <AuctionCard
              key={item.id}
              item_id={item.id}
              img={item.image}
              title={item.title}
              ratings={`${(index + 1) * 10}/50`}
              price={item.price}
              time={item.end_date}
              smCard={true}
              slug={item.slug}
              isWish={item.is_wish}
              is_own={item.is_own}
            />
          </div>
        ))}
    </>
  );
}
