import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { FrontendPageSkeleton } from "../skeleton/skeleton";
import BreadCrumb from "../BreadCrumb";
import AuctionEscapeSection from "./AuctionEscapeSection";
import CounterSection from "../home/CounterSection";
import KnowMoreSection from "./KnowMoreSection";
import AuctionWinner from "../home/AuctionWinner";
import AuctionSuccessSection from "../home/AuctionSuccessSection";

const AboutPage = async () => {
  async function getAboutPageData() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("user_token")?.value}`,
      },
      next: { revalidate: 0 },
    };
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/about`,
      requestOptions
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const data = res.json();
    return data;
  }
  const about_data = await getAboutPageData();

  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <BreadCrumb currentPage={"About Us"} />
      <AuctionEscapeSection
        title={about_data?.data?.header_title}
        subtitle={about_data?.data?.header_subtitle}
        video={about_data?.data?.video}
      />
      <CounterSection
        isAbout={true}
        page_data={about_data?.data?.counter_section}
      />
      <KnowMoreSection
        about_img="/asset/img/about-img-1.png"
        about_details={about_data?.data?.details}
      />
      <AuctionWinner page_data={about_data?.data?.winner_section} />
      <div className="bg-auc-primary-color-300">
        <AuctionSuccessSection page_data={about_data?.data?.testimonials} />
      </div>
    </Suspense>
  );
};

export default AboutPage;

export const dynamic = "force-dynamic";
