import React, { Suspense } from "react";
import AuctionCancelPage from "../../../components/dashboard/auctions/AuctionCancelPage";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AuctionCancelPage />
    </Suspense>
  );
}
