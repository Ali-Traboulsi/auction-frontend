// import Winners from '@/app/components/dashboard/winners/Winners'
import React, { Suspense } from "react";
import Winners from "../../../components/dashboard/winners/Winners";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

const page = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Winners />
    </Suspense>
  );
};

export default page;
