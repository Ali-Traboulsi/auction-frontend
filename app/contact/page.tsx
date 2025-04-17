import React, { Suspense } from "react";
import { FrontendPageSkeleton, TableSkeleton } from "../components/skeleton/skeleton";
import ContactPage from "../components/contact/ContactPage";

export default function page() {
  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <ContactPage />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
