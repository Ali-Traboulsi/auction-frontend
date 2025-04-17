import Image from "next/image";
import React, { ReactNode } from "react";

export default function TestimonialCard({
  title,
  des,
  img,
  name,
  designation,
  // companyName,
  ratings,
  wrapperCls,
}) {
  return (
    <div
      className={`min-320:p-[30px] min-768:p-[50px] rounded-[16px] testimonial-shadow relative z-20 bg-white ${
        wrapperCls && wrapperCls
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="91"
        height="91"
        viewBox="0 0 91 91"
        fill="none"
        className="absolute top-[6px] right-[16px]"
      >
        <g clipPath="url(#clip0_785_1967)">
          <path
            d="M24.6483 11.375C36.7596 11.375 45.5024 21.3738 45.5021 36.1787C45.4246 57.6893 29.2539 72.898 5.92543 75.8186C3.76111 76.0896 2.92658 73.0914 4.91964 72.2052C13.871 68.2249 18.3919 63.1742 18.9758 58.1749C19.4121 54.4399 17.3817 51.1681 14.8321 50.5554C8.22255 48.9672 3.79409 40.7361 3.79409 32.2292C3.79409 20.7117 13.1308 11.375 24.6483 11.375Z"
            fill="#DEEEEB"
          />
          <path
            d="M70.1483 11.375C82.2596 11.375 91.0024 21.3738 91.0021 36.1787C90.9246 57.6893 74.7539 72.898 51.4254 75.8186C49.2611 76.0896 48.4266 73.0914 50.4196 72.2052C59.371 68.2249 63.8919 63.1742 64.4758 58.1749C64.9121 54.4399 62.8817 51.1681 60.3321 50.5554C53.7226 48.9672 49.2941 40.7361 49.2941 32.2292C49.2941 20.7117 58.6308 11.375 70.1483 11.375Z"
            fill="#DEEEEB"
          />
        </g>
        <defs>
          <clipPath id="clip0_785_1967">
            <rect width="91" height="91" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <h4 className="text-auc-primary-color leading-[130%] font-semibold mb-[16px] relative z-10">
        {title}
      </h4>
      <p className="leading-[170%] text-auc-text-color-800">{des}</p>

      <hr className="bg-auc-primary-color-900 h-[1px] my-[24px]" />

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex items-center gap-[12px]">
          {img && (
            <Image
              src={img}
              height={60}
              width={60}
              alt="avatar"
              className="rounded-[50%]"
            />
          )}
          <div>
            <h4>{name}</h4>
            <h6 className="text-[14px] font-regular block">
              {designation} 
              {/* at <b>{companyName}</b> */}
            </h6>
          </div>
        </div>
        <div className="flex gap-[5px]">
          {[...Array(Number(ratings))].map((item, index) => (
            <svg
              key={index}
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9062 4.71875L16.375 5.375C16.75 5.4375 17.0625 5.6875 17.1875 6.0625C17.3125 6.40625 17.2188 6.8125 16.9375 7.0625L13.6875 10.2812L14.4688 14.8438C14.5312 15.2188 14.375 15.5938 14.0625 15.8125C13.75 16.0625 13.3438 16.0625 13 15.9062L9 13.75L4.96875 15.9062C4.65625 16.0625 4.21875 16.0625 3.9375 15.8125C3.625 15.5938 3.46875 15.2188 3.53125 14.8438L4.28125 10.2812L1.03125 7.0625C0.75 6.8125 0.65625 6.40625 0.78125 6.0625C0.90625 5.6875 1.21875 5.4375 1.59375 5.375L6.09375 4.71875L8.09375 0.5625C8.25 0.21875 8.59375 0 9 0C9.375 0 9.71875 0.21875 9.875 0.5625L11.9062 4.71875Z"
                fill="#FAC03C"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
