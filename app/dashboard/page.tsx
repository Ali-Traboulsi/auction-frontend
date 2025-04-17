import Dashboard from "../components/dashboard/dashboard/Dashboard";
import { Suspense } from "react";
import { DashboardSkeleton } from "../components/skeleton/skeleton";
export default async function Page() {
  return (
    <div className="">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

export const dynamic = "force-dynamic";
