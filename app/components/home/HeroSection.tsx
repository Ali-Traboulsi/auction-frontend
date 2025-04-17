"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import Button from "../buttons/Button";
import { Waypoint } from "react-waypoint";

import useLanguage from "../../hook/UseLanguage";

interface HeroSectionPropsInterface {
  title: string;
  subtitle: string;
  des: string;
  img_one: string;
  img_two: string;
  img_url?: string;
  live_count?: number;
  button_1_name?: string;
  button_1_url?: string;
}

export default function HeroSection({
  title,
  subtitle,
  des,
  img_one,
  img_two,
  img_url,
  live_count,
  button_1_name,
  button_1_url,
}: HeroSectionPropsInterface) {
  const [viewPortEntered, setViewPortEntered] = useState(false);

  const onVWEnter = () => {
    setViewPortEntered(true);
  };

  const t = useLanguage();

  return (
    <div className="relative pt-[48px] py-[70px]">
      {/* section shape */}
      <Image
        className="wow fadeInUp absolute hidden md:block  left-[0] -z-10"
        src="/assets/img/hero-shape-2.png"
        alt="hero shape"
        width={300}
        height={200}
        suppressHydrationWarning
        data-wow-delay=".1s"
      />
      <Image
        className="wow fadeInUp absolute  bottom-[190px] right-[20px] -z-20 hidden md:block"
        src="/assets/img/hero-shape.png"
        alt="hero shape"
        width={188}
        height={292}
        suppressHydrationWarning
        data-wow-delay=".1s"
      />
      {/* main img */}
      {img_one && (
        <Image
          className="wow fadeInUp absolute  bottom-[70px] right-[100px] z-[-1] hidden md:block"
          src={img_one}
          alt="hero img"
          width={349}
          height={349}
          suppressHydrationWarning
          data-wow-delay=".1s"
        />
      )}
      {/* grid wrapper */}
      <div className="md:grid grid-cols-12 auc-container gap-16 lg:gap-8 place-items-centerw">
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-start mb-[60px] md:mb-0">
          <h4
            suppressHydrationWarning
            className="font-semibold leading-[130%] mb-[16px] wow fadeInUp"
          >
            {subtitle}
          </h4>
          <h1 suppressHydrationWarning className="mb-[32px] wow fadeInUp">
            {title}
          </h1>
          <p
            suppressHydrationWarning
            className="mb-[60px] leading-[160%] wow fadeInUp"
          >
            {des}
          </p>

          <div suppressHydrationWarning className="wow fadeInUp inline-block">
            <Button
              text={button_1_name}
              styles={"auc-btn-primary"}
              href={button_1_url}
              isPlainLink={true}
            />
          </div>
        </div>

        <div
          suppressHydrationWarning
          className="col-span-12 lg:col-span-6 wow fadeInUp"
          data-wow-delay=".1s"
        >
          <div className="relative md:h-[720px]">
            <div className="bg-auc-secondary-color-700 p-[40px] rounded-[8px] text-center inline-block md:absolute z-[9999] bottom-[226px] right-[-6px] max-768:w-full">
              <h4 className="text-[48px] font-bold leading-[120%] text-white">
                <Waypoint onEnter={onVWEnter}>
                  <span>
                    {viewPortEntered && (
                      <CountUp end={live_count ? live_count : 0} start={0} />
                    )}
                  </span>
                </Waypoint>

                <span>+</span>
              </h4>
              <h5 className="text-white text-[24px] leading-[31.2px] font-regular">
                {t("Product Live Now")}
              </h5>
            </div>
            {img_two && (
              <Image
                className="absolute  top-[35px] left-[30px] z-20 hidden md:block"
                src={img_two}
                alt="hero img"
                width={395}
                height={395}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
