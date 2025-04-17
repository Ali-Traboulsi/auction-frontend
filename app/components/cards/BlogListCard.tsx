import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogListCard({ data }) {
  return (
    <div className="p-[16px] rounded-[12px] bg-white blog-shadow group">
      <div className="overflow-hidden mb-[16px] rounded-[12px]">
        <Image
          width={379}
          height={369}
          src={data.photo}
          alt="blog img"
          className="w-full max-h-[369px] object-cover  group-hover:scale-105 transition-all"
        />
      </div>
      <h4 className="mb-[12px]">
        <Link
          className="text-[24px] text-auc-text-color-900 group-hover:text-auc-primary-color transition-all  font-semibold leading-[160%]"
          href={`/blogs/${data.id}-${data.slug}`}
        >
          {data.title_update}
        </Link>
      </h4>

      <div className="mb-[16px]">
        <p className="text-[16px] font-normal leading-[170%] to-auc-text-color-800 inline">
          {data.description}
        </p>
        <Link
          className="text-[16px] font-normal leading-[170%] text-auc-primary-color inline"
          href={`/blogs/${data.id}-${data.slug}`}
        >
          Read more..
        </Link>
      </div>
      <div className="flex items-center gap-[12px]">
        <div className="overflow-hidden">
          {data?.author_photo && (
            <Image
              width={60}
              height={60}
              src={data?.author_photo}
              alt="blog img"
              className="w-[60px] h-[60px] rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-[4px]">
          <h5 className="text-[20px] font-semibold leading-[130%]">By Admin</h5>
          <span className="text-[16px] font-regular leading-[170%]">
            {data.created_date}
          </span>
        </div>
      </div>
    </div>
  );
}
