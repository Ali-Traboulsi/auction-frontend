"use client";
import React from "react";
import TitleBox from "../TitleBox";
import AuctionCard from "../cards/AuctionCard";
import Carousel from "react-multi-carousel";

interface IFeaturedSection {
  page_data: any;
  title: string;
  subtitle?: string;
}

export default function FeaturedSection({
  page_data,
  title,
  subtitle
}: IFeaturedSection) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1199, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 767, min: 576 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide, totalItems, slidesToShow },
    } = rest;
    return (
      <div className="carousel-button-group">
        <button
          className="absolute z-30 left-[10px] min-768:-left-[15px] min-1440:-left-[30px]   min-1920:-left-[120px]"
          disabled={currentSlide === 0}
          onClick={() => previous()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="w-[40px] h-[40px] min-1600:w-[80px] min-1600:h-[80px]"
          >
            <g clipPath="url(#clip0_785_1539)">
              <path
                d="M40.0003 0C62.0916 0 80 17.9084 80 39.9998C80 62.0911 62.0916 80.0002 40.0003 80.0002C17.909 80.0002 -0.000198364 62.0911 -0.000198364 39.9998C0.024704 17.9187 17.9185 0.0249022 40.0003 0ZM40.0003 75.9997C59.8826 75.9997 76.0002 59.8821 76.0002 39.9998C76.0002 20.1174 59.8826 3.99976 40.0003 3.99976C20.118 3.99976 4.00029 20.1174 4.00029 39.9998C4.02299 59.8726 20.1275 75.977 40.0003 75.9997Z"
                fill={currentSlide === 0 ? "#6B788E" : "#008080"}
              />
              <path
                d="M44.6863 24.4945C45.5183 23.7672 46.7817 23.8522 47.509 24.6835C48.2356 25.5155 48.1506 26.7789 47.3193 27.5062L33.0401 39.9999L47.3201 52.4943C48.1521 53.2215 48.2363 54.485 47.5098 55.3163C46.7825 56.1483 45.5191 56.2333 44.687 55.506L28.6873 41.5057C28.2529 41.1263 28.0039 40.577 28.0039 39.9999C28.0039 39.4227 28.2529 38.8741 28.6873 38.494L44.6863 24.4945Z"
                fill={currentSlide === 0 ? "#6B788E" : "#008080"}
              />
            </g>
            <defs>
              <clipPath id="clip0_785_1539">
                <rect
                  width="80"
                  height="80"
                  fill="white"
                  transform="matrix(-1 0 0 1 80 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          className="absolute z-30  right-[10px]  min-768:-right-[15px] min-1440:-right-[30px]  min-1920:-right-[120px]"
          onClick={() => next()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="w-[40px] h-[40px] min-1600:w-[80px] min-1600:h-[80px]"
          >
            <g clipPath="url(#clip0_785_1536)">
              <path
                d="M39.9997 0C17.9084 0 0 17.9084 0 39.9998C0 62.0911 17.9084 80.0002 39.9997 80.0002C62.091 80.0002 80.0002 62.0911 80.0002 39.9998C79.9753 17.9187 62.0815 0.0249022 39.9997 0ZM39.9997 75.9997C20.1174 75.9997 3.99975 59.8821 3.99975 39.9998C3.99975 20.1174 20.1174 3.99976 39.9997 3.99976C59.882 3.99976 75.9997 20.1174 75.9997 39.9998C75.977 59.8726 59.8725 75.977 39.9997 75.9997Z"
                fill={
                  currentSlide === totalItems - slidesToShow
                    ? "#6B788E"
                    : "#008080"
                }
              />
              <path
                d="M35.3137 24.4945C34.4817 23.7672 33.2183 23.8522 32.491 24.6835C31.7644 25.5155 31.8494 26.7789 32.6807 27.5062L46.9599 39.9999L32.6799 52.4943C31.8479 53.2215 31.7637 54.485 32.4902 55.3163C33.2175 56.1483 34.4809 56.2333 35.313 55.506L51.3127 41.5057C51.7471 41.1263 51.9961 40.577 51.9961 39.9999C51.9961 39.4227 51.7471 38.8741 51.3127 38.494L35.3137 24.4945Z"
                fill={
                  currentSlide === totalItems - slidesToShow
                    ? "#6B788E"
                    : "#008080"
                }
                // fill="#008080"
              />
            </g>
            <defs>
              <clipPath id="clip0_785_1536">
                <rect width="80" height="80" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="pb-[120px] pt-[110px] bg-auc-primary-color-300">
      <div className="auc-container relative">
        <TitleBox title={title} subtitle={subtitle} />
        <div
          suppressHydrationWarning
          className="wow fadeInUp"
          data-wow-delay=".1s"
        >
          <Carousel
            arrows={false}
            customButtonGroup={
              <ButtonGroup
                next={undefined}
                previous={undefined}
                goToSlide={undefined}
              />
            }
            responsive={responsive}
          >
            {page_data?.map((auc) => (
              <AuctionCard
                key={auc.id}
                item_id={auc.id}
                img={auc.image}
                title={auc.title}
                // ratings="10/50"
                price={auc.price}
                time={auc.end_date}
                smCard={false}
                slug={auc.slug}
                wrapperCls={`m-4`}
                isWish={auc.is_wish}
                is_own={auc.is_own}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
