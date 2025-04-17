import React, { Suspense } from "react";
import CreateTicket from "../../../components/dashboard/tickets/CreateTicket";
import { TableSkeleton } from "../../../components/skeleton/skeleton";

const page = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <CreateTicket />
    </Suspense>
  );
};

export default page;
