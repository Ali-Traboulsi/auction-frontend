"use client";
import React from "react";
import BlogSmCard from "../cards/BlogSmCard";
import Link from "next/link";
import useLanguage from "../../hook/UseLanguage";

export default function BlogSidebar({ blog_data }) {
  const t = useLanguage();

  return (
    <div className="bg-white blog-shadow py-[32px] px-[24px] flex flex-col gap-[32px]">
      <div className="bg-white">
        <h4 className="auc-blog-sidebar-header mb-[24px]">
          {t("Recent Post")}
        </h4>
        <div className="flex flex-col gap-[24px]">
          {blog_data.data.recent_post.map((item, index) => (
            <div
              key={index}
              className=" last:border-b last:border-1 last:border-auc-text-color-500 last:pb-[32px]"
            >
              <BlogSmCard data={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white">
        <h4 className="auc-blog-sidebar-header mb-[24px]">{t("Categories")}</h4>
        <div className="flex flex-wrap gap-y-[24px] gap-x-[16px]">
          <ul className="flex flex-col gap-2">
            {blog_data.data.category.map((cat, index) => (
              <li key={index} className="cate-tag">
                <Link
                  key={index}
                  className="hover:text-auc-primary-color"
                  href={`/blogs?category=${cat.slug}`}
                >
                  <span className="mr-2">
                    <i className="fas fa-angle-double-right"></i>
                  </span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white">
        <h4 className="auc-blog-sidebar-header mb-[24px]"> {t("Tags")}</h4>
        <div className="flex flex-wrap gap-y-[24px] gap-x-[16px]">
          {blog_data.data.api_tags.map((tag, index) => (
            <Link key={index} className="blog-tag" href={`/blogs?tag=${tag}`}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
