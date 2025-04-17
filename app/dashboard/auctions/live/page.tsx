import React, { Suspense } from "react";
import LiveAuctionsPage from "../../../components/dashboard/auctions/LiveAuctionsPage";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <LiveAuctionsPage />
    </Suspense>
  );
}
