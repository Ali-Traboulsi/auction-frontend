import React, { Suspense } from "react";
import BlogListCard from "../components/cards/BlogListCard";
import PaginationForServer from "../components/pagination/PaginationForServer";
import BreadCrumb from "../components/BreadCrumb";
import { FrontendPageSkeleton } from "../components/skeleton/skeleton";
import Image from "next/image";

async function getBlogsData(searchParams) {
  const requestOptions = {
    method: "GET",
    next: { revalidate: 0 },
  };

  const queryParams = new URLSearchParams(searchParams).toString();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/blogs?${queryParams}`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function Blogs({ searchParams }) {
  const blogs = await getBlogsData(searchParams);

  return (
    <>
      <Suspense fallback={<FrontendPageSkeleton />}>
        <BreadCrumb currentPage={"Blog List"} />
        <div className="auc-container pt-[120px] pb-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {blogs && blogs.data.data.length > 0 ? (
              blogs.data.data.map((item, index) => (
                <BlogListCard key={index} data={item} />
              ))
            ) : (
              <div className="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3">
                <Image
                  src={`/assets/img/not_found.png`}
                  width={500}
                  height={500}
                  alt="not found img"
                  className="w-[500px] h-[500px] object-cover"
                />
              </div>
            )}
          </div>
          {blogs && blogs.data.data.length > 0 && (
            <div className="mt-[32px] flex justify-center">
              <PaginationForServer
                current_page={blogs?.data?.current_page}
                page_links={blogs?.data?.links}
                pg_link_route={`/blogs`}
                per_page={blogs?.data?.per_page}
                total_items={blogs?.data?.total}
              />
            </div>
          )}
        </div>
      </Suspense>
    </>
  );
}

export const dynamic = "force-dynamic";
