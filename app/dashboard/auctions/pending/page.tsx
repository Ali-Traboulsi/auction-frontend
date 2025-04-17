import React, { Suspense } from "react";
import PendingPage from "../../../components/dashboard/auctions/PendingPage";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <PendingPage />
    </Suspense>
  );
}
