import React, { Suspense } from "react";
import KycInfo from "../../../components/dashboard/kyc/KycInfo";
import { KycInfoSkeleton } from "../../../components/skeleton/skeleton";

const page = () => {
  return (
    <>
      <Suspense fallback={<KycInfoSkeleton />}>
        <KycInfo />
      </Suspense>
    </>
  );
};

export default page;
