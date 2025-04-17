import React from "react";

const Pagination = ({
  current_page,
  links,
  per_page,
  total_items,
  handlePageCount,
}) => {
  const default_styles =
    "border border-1 border-x-auc-primary-color-400 py-[12px] px-[24px] rounded-[4px]  inline-flex  justify-center items-center  text-[20px] hover:bg-auc-primary-color hover:text-white";

    if (total_items > per_page )  {
    return (
      <div
        suppressHydrationWarning
        className="flex min-768:col-span-2 min-1440:col-span-3 justify-center gap-[12px] mt-[48px] wow fadeInUp"
        data-wow-delay="0.1s"
      >
        {links &&
          links.map((pg, index) => (
            <button
              onClick={() => handlePageCount(pg.label)}
              key={index}
              // className={`${paginationDefaultStyle}`}
              className={`${default_styles} ${
                pg.label == current_page
                  ? "bg-auc-primary-color text-white"
                  : "bg-white text-auc-text-color-900"
              }`}
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
            </button>
          ))}
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
