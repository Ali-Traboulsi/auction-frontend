import React, { Suspense } from "react";
import Wishlists from "../../components/dashboard/wishlists/Wishlists";
import { TableSkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <Wishlists />
      </Suspense>
    </div>
  );
};

export default page;
