import React, { Suspense } from "react";
import Log from "../../../components/dashboard/logs/Log";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Log />
    </Suspense>
  );
}
