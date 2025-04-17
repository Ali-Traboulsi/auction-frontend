import React from "react";
import BiddingList from "../../../../components/dashboard/auctions/BiddingList";

const tableHead = [
  "S.N.",
  "Bidder",
  "Product Name",
  "Product Price",
  "Bid Price",
  "Bid Time",
];

const page = ({ params: { id } }) => {
  return (
    <>
      <h2 className="auc-primary-heading">Bidding List</h2>
      <BiddingList bid_id={id} tableHead={tableHead} />
    </>
  );
};

export default page;

export const dynamic = "force-dynamic";
