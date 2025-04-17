import React, { Suspense } from "react";
import AuctionsExpiredPage from "../../../components/dashboard/auctions/AuctionsExpiredPage";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AuctionsExpiredPage />
    </Suspense>
  );
}
