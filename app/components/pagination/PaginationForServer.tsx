"use client";
import Link from "next/link";

export default function PaginationForServer({
  page_links,
  current_page,
  pg_link_route,
  per_page,
  total_items,
}) {
  function extractPageNumber(url) {
    if (!url) {
      return 1; // Return default page number if URL is null
    }

    try {
      const params = new URL(url).searchParams;
      const page = params.get("page");
      return page ? parseInt(page) : 1;
    } catch (error) {
      console.error("Invalid URL:", url);
      return 1; // Return default page number in case of error
    }
  }

  const default_styles =
    "border border-1 border-x-auc-primary-color-400 py-[12px] px-[24px] rounded-[4px]  inline-flex  justify-center items-center  text-[20px] hover:bg-auc-primary-color hover:text-white";

  if (total_items > per_page ) {
    return (
      <div>
        <ul className="flex flex-wrap gap-4">
          {page_links.map((pg, index) => (
            <li key={index}>
              <Link
                className={`${default_styles} ${
                  pg.label == current_page
                    ? "bg-auc-primary-color text-white"
                    : "bg-white text-auc-text-color-900"
                }`}
                href={`${pg_link_route}/?page=${extractPageNumber(pg.url)}`}
              >
                {pg.label === "&laquo; Previous" ? (
                  <span>
                    <i className="fas fa-angle-double-left"></i>
                  </span>
                ) : pg.label === "Next &raquo;" ? (
                  <span>
                    <i className="fas fa-angle-double-right"></i>
                  </span>
                ) : (
                  pg.label
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
