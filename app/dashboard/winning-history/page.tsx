import React, { Suspense } from "react";
import WinningHistory from "../../components/dashboard/winning-history/WinningHistory";
import { TableSkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <WinningHistory />
      </Suspense>
    </div>
  );
};

export default page;
