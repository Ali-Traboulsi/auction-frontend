import React, { Suspense } from "react";
import ChangePassword from "../../components/dashboard/change-password/ChangePassword";
import { ChangePasswordSkelton } from "../../components/skeleton/skeleton";

const page = () => {
  return (
    <Suspense fallback={<ChangePasswordSkelton/>}>
      <ChangePassword />
    </Suspense>
  );
};

export default page;
