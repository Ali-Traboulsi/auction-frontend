import { cookies } from "next/headers";
import HeroSection from "./components/home/HeroSection";
import CounterSection from "./components/home/CounterSection";
import CategorySection from "./components/home/CategorySection";
import FeaturedSection from "./components/home/FeaturedSection";
import LiveAuctionSection from "./components/home/LiveAuctionSection";
import CallToActionSection from "./components/home/CallToActionSection";
import AuctionWinner from "./components/home/AuctionWinner";
import AuctionUpdateSection from "./components/home/AuctionUpdateSection";
import AuctionSuccessSection from "./components/home/AuctionSuccessSection";
import { FrontendPageSkeleton } from "./components/skeleton/skeleton";

async function getHomeData() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies().get("user_token")?.value}`,
    },
    next: { revalidate: 0, cache: "no-store" },
  };
  const res = await fetch(`${process.env.API_BASE_URL}/api`, requestOptions);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

export default async function Home() {
  const home_data = await getHomeData();
  const {
    hero,
    counter_section,
    categories,
    featured_items,
    live_items,
    registration_section,
    winner_section,
    blogs,
    testimonials,
    header_sections,
  } = home_data.data;

  console.log(counter_section?.sub_content?.length)

  if (!home_data?.data) return <FrontendPageSkeleton />;

  return (
    <main className="">
      {hero && hero?.status == 1 && (
        <HeroSection
          title={hero?.content?.heading}
          subtitle={hero?.content?.title}
          des={hero?.content?.sub_heading}
          img_one={hero?.image_two}
          img_two={hero?.image}
          live_count={hero?.live_count}
          button_1_name={hero?.content?.button_1_name}
          button_1_url={hero?.content?.button_1_url}
        />
      )}

      {counter_section && counter_section?.status == 1  && (
        <CounterSection page_data={counter_section} />
      )}
      {header_sections && categories?.length > 0 && (
        <CategorySection
          title={header_sections?.category_title}
          subtitle={header_sections?.category_subtitle}
          categories={categories}
        />
      )}

      {header_sections && featured_items && (
        <FeaturedSection
          title={header_sections?.featured_title}
          subtitle={header_sections?.featured_subtitle}
          page_data={featured_items}
        />
      )}

      {header_sections && live_items && (
        <LiveAuctionSection
          title={header_sections?.liveauction_title}
          subtitle={header_sections?.liveauction_subtitle}
          page_data={live_items}
        />
      )}

      {registration_section && registration_section?.status == 1 && (
        <CallToActionSection page_data={registration_section} />
      )}

      {winner_section && winner_section?.status == 1 && (
        <AuctionWinner page_data={winner_section} />
      )}

      {header_sections && blogs?.length > 0 && (
        <AuctionUpdateSection
          title={header_sections?.blog_title}
          subtitle={header_sections?.blog_subtitle}
          page_data={blogs}
        />
      )}

      {testimonials && testimonials?.status == 1 && (
        <AuctionSuccessSection page_data={testimonials} />
      )}
    </main>
  );
}

export const dynamic = "force-dynamic";
