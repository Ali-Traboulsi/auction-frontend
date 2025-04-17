import React, { Suspense } from "react";
import KycForm from "../../components/dashboard/kyc/KycForm";
import { KycFormSkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  return (
    <div>
      <Suspense fallback={<KycFormSkeleton />}>
        <KycForm />
      </Suspense>
    </div>
  );
};

export default page;
