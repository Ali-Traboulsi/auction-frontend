import React, { Suspense } from "react";
import BiddingHistory from "../../components/dashboard/bidding-history/BiddingHistory";
import { TableSkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <BiddingHistory />
      </Suspense>
    </div>
  );
};

export default page;
