import React, { Suspense } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { FrontendPageSkeleton } from "../../components/skeleton/skeleton";

async function getpageData(slug) {
  const requestOptions = {
    method: "GET",
    next: { revalidate: 0 },
  };

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/pages-${slug}`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function page({ params: { slug } }) {
  const page_data = await getpageData(slug);
  return (
    <Suspense fallback={<FrontendPageSkeleton/>}>
      <BreadCrumb currentPage={page_data?.data?.title} />
      <div className="auc-container mt-[80px] mb-[120px]">
        <div className="bg-white blog-shadow p-[24px] rounded-[12px]">
          <h3 className="text-[32px] font-semibold leading-[130%] text-auc-text-color-900 mb-[24px]">
            {page_data?.data?.title}
          </h3>
          <span
            dangerouslySetInnerHTML={{ __html: page_data?.data?.details }}
          ></span>
        </div>
      </div>
    </Suspense>
  );
}
