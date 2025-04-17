"use client";
import React from "react";
import TitleBox from "../TitleBox";
import Image from "next/image";
import TestimonialCard from "../cards/TestimonialCard";
import Carousel from "react-multi-carousel";
import { extractBaseUrlUntilImages } from "../../helpers/helpers";

export default function AuctionSuccessSection({ page_data }) {
  // generate img
  const imageUrl = page_data.image;
  const baseUrlUntilImages = extractBaseUrlUntilImages(imageUrl);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 576 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="pb-[120px] pt-[110px] relative">
      {/* section shape */}
      <Image
        className="absolute  left-[0] z-[0]"
        src="/assets/img/hero-shape-2.png"
        alt="hero shape"
        width={300}
        height={200}
      />
      <div className="auc-container auc-testimonial-section">
        <TitleBox
          title={page_data.content.title}
          subtitle={page_data.content.sub_heading}
        />
        <Carousel
          arrows={false}
          // customButtonGroup={<ButtonGroup />}
          responsive={responsive}
          showDots={true}
          containerClass="mb-[60px]"
          dotListClass=" auc-testi-dot-btns-wrapper"
        >
          {page_data.sub_content &&
            page_data.sub_content.map((testimonial, index) => (
              <TestimonialCard
                title={testimonial.title}
                des={testimonial.quote}
                img={`${baseUrlUntilImages}/${testimonial.image}`}
                name={testimonial.name}
                designation={testimonial.designation}
                // companyName="Apple"
                ratings={testimonial.star}
                wrapperCls={`m-4`}
                key={index}
              />
            ))}
        </Carousel>
        {/* </div> */}
      </div>
    </div>
  );
}
