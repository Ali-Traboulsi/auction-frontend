import React, { Suspense } from "react";
import AllUpcomingAuctionsPage from "../../../components/dashboard/auctions/AllUpcomingAuctionsPage";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AllUpcomingAuctionsPage />
    </Suspense>
  );
}
