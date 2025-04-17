import React from "react";
import {
  AddMoneySkeleton,
  AuctionCreateSkeleton,
  ChangePasswordSkelton,
  DashboardSkeleton,
  FrontendPageSkeleton,
  KycFormSkeleton,
  KycInfoSkeleton,
  ProfileSettingSkeleton,
  TableSkeleton,
  TwoFactorSkeleton,
} from "../components/skeleton/skeleton";
// import TableSkeleton from "../components/skeleton/TableSkeleton";

export default function page() {
  return (
    <div>
      {/* <DashboardSkeleton /> */}
      {/* <TableSkeleton /> */}
      {/* <KycFormSkeleton /> */}
      {/* <KycInfoSkeleton /> */}
      {/* <AuctionCreateSkeleton /> */}
      {/* <AddMoneySkeleton /> */}
      {/* <ProfileSettingSkeleton /> */}
      {/* <TwoFactorSkeleton /> */}
      {/* <ChangePasswordSkelton /> */}
      <FrontendPageSkeleton />
    </div>
  );
}
