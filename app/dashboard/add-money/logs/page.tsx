import React, { Suspense } from "react";
import DepositLogs from "../../../components/dashboard/deposits/DepositLogs";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <DepositLogs />
    </Suspense>
  );
}
