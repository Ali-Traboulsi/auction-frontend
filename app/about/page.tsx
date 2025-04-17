import React, { Suspense } from "react";
import AboutPage from "../components/about/AboutPage";
import { FrontendPageSkeleton} from "../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <AboutPage />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
