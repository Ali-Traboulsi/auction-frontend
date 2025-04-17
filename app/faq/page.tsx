import React, { Suspense } from "react";
import FAQPage from "../components/faq/FAQPage";
import { FrontendPageSkeleton } from "../components/skeleton/skeleton";

export default function page() {
  return (
    <Suspense fallback={<FrontendPageSkeleton/>}>
      <FAQPage />
    </Suspense>
  );
}
