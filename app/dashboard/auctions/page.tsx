import React, { Suspense } from "react";
import CreateAuctions from "../../components/dashboard/auctions/CreateAuctions";
import { AuctionCreateSkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  const title = "Create Auctions";
  return (
    <>
      <Suspense fallback={<AuctionCreateSkeleton />}>
        <CreateAuctions title={title} />
      </Suspense>
    </>
  );
};

export default page;
