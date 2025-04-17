import React, { Suspense } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import AddToCartSection from "../../../components/products/AddToCartSection";
import DesAccordionSection from "../../../components/products/DesAccordionSection";
import FeaturedSection from "../../../components/home/FeaturedSection";
import "react-loading-skeleton/dist/skeleton.css";

async function getAuctionDetailsData(slug: { slug: string }) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/auction-details/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

export default async function page({ params: { slug } }) {
  const page_data = await getAuctionDetailsData(slug);

  return (
    <>
      <BreadCrumb currentPage={"Auction"} />
      <AddToCartSection page_data={page_data} />
      <DesAccordionSection
        description={page_data?.data?.description}
        specification={page_data?.data?.specification}
        auction_history={page_data?.data?.auction_history}
        vendor_products={page_data?.data?.more_from_vendor}
      />

      {page_data?.data?.related_product?.length > 0 && (
        <FeaturedSection
          title={`Related Products`}
          page_data={page_data?.data?.related_product}
        />
      )}
    </>
  );
}
