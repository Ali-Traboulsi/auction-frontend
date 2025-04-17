import BreadCrumb from "../components/BreadCrumb";
import ProductSidebar from "../components/products/ProductSidebar";
import ProductGrid from "../components/products/ProductGrid";
import { Drawer } from "@material-tailwind/react";

// import { getProductList } from "../../utils/ApiFunctions";
import PaginationForServer from "../components/pagination/PaginationForServer";
import { Suspense } from "react";
import { FrontendPageSkeleton } from "../components/skeleton/skeleton";
import MobileFilter from "../components/products/MobileFilter";
import Image from "next/image";

async function getProductList(queryParams) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/auctions?${queryParams}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

export default async function Page({ params, searchParams }) {
  const queryParams = new URLSearchParams(searchParams).toString();

  const product_data = await getProductList(queryParams);

  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <BreadCrumb currentPage={"Auction"} />

      {/* mobile product sidebar */}
      <MobileFilter>
        <Suspense>
          <ProductSidebar
            search_query={searchParams}
            conditionData={product_data?.data?.conditionData}
            categories_list={product_data?.data?.categories}
            price_range={product_data?.data?.searchRangeMax}
          />
        </Suspense>
      </MobileFilter>

      <div className="auc-container py-[120px] ">
        <div className="min-992:grid lg:grid-cols-12 gap-[24px]">
          <div
            className={`lg:col-span-3 min-992:!sticky hidden min-992:block min-992:top-[30px]`}
          >
            <Suspense>
              <ProductSidebar
                search_query={searchParams}
                conditionData={product_data?.data?.conditionData}
                categories_list={product_data?.data?.categories}
                price_range={product_data?.data?.searchRangeMax}
              />
            </Suspense>
          </div>
          <div className="lg:col-span-9">
            <div className="grid  min-768:grid-cols-2 min-1440:grid-cols-3 gap-y-[40px] gap-x-[24px]">
              {product_data?.data?.auction?.data?.length > 0 ? (
                <ProductGrid product_list={product_data?.data?.auction?.data} />
              ) : (
                <div className="col-span-2 min-768:col-span-2 min-1440:col-span-3 flex justify-center items-center gap-y-[40px] gap-x-[24px] auc-dashboard-sidebar-shadow  h-full min-h-[100vh]">
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
            {product_data?.data?.auction?.data?.length > 0 && (
              <div className="flex justify-center w-full mt-[40px] ">
                <PaginationForServer
                  current_page={product_data?.data?.auction?.meta?.current_page}
                  page_links={product_data?.data?.auction?.meta?.links}
                  pg_link_route={`/product`}
                  per_page={product_data?.data?.auction?.meta?.per_page}
                  total_items={product_data?.data?.auction?.meta?.total}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
