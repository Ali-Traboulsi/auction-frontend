"use client";
import { Jost } from "next/font/google";
import "./globals.css";
import "./global_responsive.css";
import ClientLayout from "./ClientLayout";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import useGlobalStore from "./store/GlobalStore";
import { Suspense } from "react";
import { HeaderSkelton } from "./components/skeleton/skeleton";
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function RootLayout({ children }) {
  const store = useGlobalStore();
  
  const page_title = `${store?.general_settings?.website_title
    ? store?.general_settings?.website_title
    : "Home"
    } - ${store?.activePage}`;

  return (
    <html lang="en">
      <head>
        {/* <!--Essential css files--> */}
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/font-awsome-all.min.css" />
        <title>{page_title}</title>
        <meta
          name="description"
          content={store?.general_settings?.seo.description}
        />
        <meta name="keywords" content={store?.general_settings?.seo.keywords} />
        <meta
          property="og:title"
          content={store?.general_settings?.seo?.title}
        />
        <meta
          property="og:description"
          content={store?.general_settings?.seo.description}
        />
        <meta
          property="og:image"
          content={store?.general_settings?.seo.image}
        />
        <link rel="icon" href={store?.general_settings?.favicon} />

      </head>

      <body className={jost.className} suppressHydrationWarning={true}>
        <Suspense fallback={<HeaderSkelton />}>
          <ClientLayout>
            <Header />
            {children}
            <Footer />
          </ClientLayout>
        </Suspense>

        {/* <!--Esential Js Files--> */}
        <script src="/assets/js/wow.js"></script>
        <script src="/assets/js/main.js"></script>
      </body>
    </html>
  );
}
