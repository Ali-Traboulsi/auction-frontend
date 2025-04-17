"use client";
import Image from "next/image";
import React, { useState } from "react";
import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";
import { extractBaseUrlUntilImages } from "../../helpers/helpers";

export default function CounterSection({ page_data, isAbout = false }) {
  // generate img
  const imageUrl = page_data.image;
  const baseUrlUntilImages = extractBaseUrlUntilImages(imageUrl);

  const [viewPortEntered, setViewPortEntered] = useState(false);

  const onVWEnter = () => {
    setViewPortEntered(true);
  };

  return (
    <div
      className={`${isAbout ? "bg-auc-dark-color-2" : "bg-auc-primary-color"
        } py-[80px] relative overflow-hidden`}
    >
      {!isAbout && (
        <Image
          width={1920}
          height={244}
          src={`/assets/img/counter-bg.png`}
          alt="counter-bg"
          className="absolute bottom-0 left-0 z-10 w-full h-full object-cover"
        />
      )}

      <div className="auc-container relative z-20">
        <div className="grid md:grid-cols-3 gap-4 ">
          {page_data &&
            page_data.sub_content?.map((counter_data, index) => (
              <div
                key={index}
                suppressHydrationWarning
                className="flex max-576:flex-wrap md:flex-wrap lg:flex-nowrap gap-4 items-center justify-center md:justify-normal text-center md:text-start wow fadeInUp"
                data-wow-delay=".1s"
              >
                <div className="bg-white w-[85px] h-[85px] rounded-sm p-[20p] flex justify-center items-center">
                  {counter_data?.image && (
                    <Image
                      width={50}
                      height={50}
                      className={`${isAbout ? "rounded-lg" : "rounded-sm"}`}
                      src={`${baseUrlUntilImages}/${counter_data?.image}`}
                      alt={"icon"}
                    />
                  )}
                </div>

                <div className="max-576:w-full">
                  <h3 className="leading-[130%] text-white font-semibold">
                    <Waypoint onEnter={onVWEnter}>
                      <span>
                        {viewPortEntered && (
                          <CountUp
                            end={Number(counter_data.counter)}
                            start={0}
                          />
                        )}
                      </span>
                    </Waypoint>
                    <span>+</span>
                  </h3>
                  <p className="leading-[160%] text-white">
                    {counter_data.title}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );


}
