import React, { Suspense } from "react";
import AllAuctionsPage from "../../../components/dashboard/auctions/AllAuctionsPage";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AllAuctionsPage />
    </Suspense>
  );
}
