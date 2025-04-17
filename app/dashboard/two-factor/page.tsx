import React, { Suspense } from "react";


import TwoFactor from "../../components/dashboard/two-factor/TwoFactor";
import { TwoFactorSkeleton } from "../../components/skeleton/skeleton";

const page = () => {
  return (
    <Suspense fallback={<TwoFactorSkeleton/>}>
      <TwoFactor />
    </Suspense>
  );
};

export default page;
