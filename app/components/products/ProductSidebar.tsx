"use client";

import type { CheckboxStylesType } from "@material-tailwind/react";
import type { CheckboxProps } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import React, { useCallback, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { numberWithCommas } from "../../helpers/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useLanguage from "../../hook/UseLanguage";
import Link from "next/link";

export default function ProductSidebar({
  categories_list,
  search_query,
  conditionData,
  price_range,
}) {
  const [priceRange, setPriceRange] = useState([0, price_range]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [selectedConditionOption, setSelectedConditionOption] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasPrams = searchParams.toString();

  const t = useLanguage();

  const clearCheckboxes = () => {
    setSelectedOption("");
    setSelectedCategoryOption("");
    setSelectedConditionOption("");
  };

  // Get a new searchParams string by merging the current
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(hasPrams);
      params.set(name, value);

      return params.toString();
    },
    [hasPrams]
  );

  // handle sort by(ase,des,low/high price,name etc)
  const handleSortBy = (value) => {
    if (selectedOption !== value) {
      setSelectedOption(value);
      router.push(pathname + "?" + createQueryString("sortby", `${value}`));
    }
  };
  // handle sort by category
  const handleSortByCategory = (value) => {
    if (selectedCategoryOption !== value) {
      setSelectedCategoryOption(value);
      router.push(pathname + "?" + createQueryString("category", `${value}`));
    }
  };
  // handle sort by conditions
  const handleConditionChange = (value) => {
    if (selectedConditionOption !== value) {
      setSelectedConditionOption(value);
      router.push(pathname + "?" + createQueryString("condition", `${value}`));
    }
  };
  // handle sort by highest price
  const handlePriceChange = (value) => {
    setPriceRange(value);
    router.push(
      pathname + "?" + createQueryString("price", `${priceRange[1]}`)
    );
  };

  return (
    <div className="bg-white p-[24px] overflow-y-scroll flex flex-col gapp-[48px] auc-dashboard-sidebar-shadow  h-full">
      {hasPrams && (
        <Link
          onClick={clearCheckboxes}
          href="/product"
          className="text-left capitalize text-[14px] min-992:text-[16px] mb-[20px] border-b pb-[20px] hover:text-auc-primary-hover-color"
        >
          clear filter <i className="fas fa-trash-alt inline-block ml-4"></i>
        </Link>
      )}

      <div className="bg-white mb-[48px]">
        <h4 suppressHydrationWarning className="mb-[20px] wow fadeInUp">
          {t("Sort By")}
        </h4>
        <ul className="list-none p-0 m-0 relative -left-[8px]">
          <li
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Checkbox
              onChange={() => handleSortBy("latest")}
              label="latest"
              ripple={true}
              checked={selectedOption === "latest"}
              crossOrigin={undefined}
            />
          </li>
          <li
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Checkbox
              onChange={() => handleSortBy("oldest")}
              checked={selectedOption === "oldest"}
              label="oldest"
              ripple={true}
              crossOrigin={undefined}
            />
          </li>
          <li
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Checkbox
              onChange={() => handleSortBy("price_asc")}
              checked={selectedOption === "price_asc"}
              label="price low to high"
              ripple={true}
              crossOrigin={undefined}
            />
          </li>
          <li
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Checkbox
              onChange={() => handleSortBy("price_desc")}
              checked={selectedOption === "price_desc"}
              label="price high to low"
              ripple={true}
              crossOrigin={undefined}
            />
          </li>
          <li
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Checkbox
              onChange={() => handleSortBy("title_asc")}
              checked={selectedOption === "title_asc"}
              label="Name (A to Z)"
              ripple={true}
              crossOrigin={undefined}
            />
          </li>
          <li
            suppressHydrationWarning
            className="wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Checkbox
              onChange={() => handleSortBy("title_desc")}
              checked={selectedOption === "title_desc"}
              label="Name (Z to A)"
              ripple={true}
              crossOrigin={undefined}
            />
          </li>
        </ul>
      </div>

      <div className="bg-white mb-[48px]">
        <h4
          suppressHydrationWarning
          className="mb-[24px] wow fadeInUp"
          data-wow-delay="0.1s"
        >
          {t("Price Range")}
        </h4>
        <RangeSlider
          max={price_range}
          min={0}
          onInput={handlePriceChange}
          // suppressHydrationWarning
          className="auc-product-range wow fadeInUp"
          data-wow-delay="0.1s"
        />
        <span
          suppressHydrationWarning
          className="text-[16px] leading-[120%] capitalize block mt-[16px] wow fadeInUp"
          data-wow-delay="0.1s"
        >
          Price: ${numberWithCommas(priceRange[0])} - $
          {numberWithCommas(priceRange[1])}
        </span>
      </div>

      <div className="bg-white mb-[48px]">
        <h4
          suppressHydrationWarning
          className="mb-[24px] wow fadeInUp"
          data-wow-delay="0.1s"
        >
          {t("By Category")}
        </h4>
        <ul className="list-none p-0 m-0 relative -left-[8px]">
          {categories_list &&
            categories_list.map((item, index) => (
              <li
                key={item.id}
                suppressHydrationWarning
                className="flex items-center justify-between wow fadeInUp"
                data-wow-delay={`0.${index}s`}
              >
                <Checkbox
                  checked={selectedCategoryOption === item.slug}
                  onChange={() => handleSortByCategory(item.slug)}
                  label={item.name}
                  ripple={true}
                  crossOrigin={undefined}
                />
                <span>({item.count_auction})</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-white">
        <h4
          suppressHydrationWarning
          className="mb-[20px] wow fadeInUp"
          data-wow-delay="0.1s"
        >
          {t("Condition")}
        </h4>
        <ul className="list-none p-0 m-0 relative -left-[8px]">
          {conditionData &&
            Object.entries(conditionData).map(
              ([condition, count]: [string, number], index) => (
                <li
                  key={index}
                  suppressHydrationWarning
                  className="flex items-center justify-between wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <Checkbox
                    label={condition}
                    ripple={true}
                    crossOrigin={undefined}
                    checked={selectedConditionOption === condition}
                    onChange={() => handleConditionChange(condition)}
                  />
                  <span>({count})</span>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
}
