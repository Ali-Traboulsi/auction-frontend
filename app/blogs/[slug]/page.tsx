import React, { Suspense } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Image from "next/image";
import Link from "next/link";
import BlogSmCard from "../../components/cards/BlogSmCard";
import BlogSidebar from "../../components/blog/BlogSidebar";
import { FrontendPageSkeleton } from "../../components/skeleton/skeleton";

async function getBlogsData(slug) {
  const requestOptions = {
    method: "GET",
    next: { revalidate: 0 },
  };

  // const queryParams = new URLSearchParams(searchParams).toString();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/blog-details/${slug}`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function page({ params: { slug } }) {
  const blog_data = await getBlogsData(slug);

  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <BreadCrumb currentPage={"Blog page"} />
      <div className="auc-container mt-[80px] mb-[120px]">
        <div className="grid grid-cols-12 gap-[24px]">
          <div className="col-span-12 lg:col-span-7 xl:col-span-8">
            <div className="bg-white blog-shadow p-[24px] rounded-[12px]">
              <h3 className="text-[32px] font-semibold leading-[130%] text-auc-text-color-900 mb-[24px]">
                {blog_data.data.title}
              </h3>
              <span
                dangerouslySetInnerHTML={{ __html: blog_data?.data?.description }}
              ></span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 xl:col-span-4">
            <BlogSidebar blog_data={blog_data} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
