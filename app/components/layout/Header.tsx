import React, { Suspense } from "react";
import Navbar from "../navbar/Navbar";
import { HeaderSkelton } from "../skeleton/skeleton";

export default function Header() {
  return (
    <>
      <header className=" border-b border-auc-text-color-500">
        <div className="auc-container py-[12px] min-1200:py-[32px]">
          <div className="grid-cols-12 items-center grid ">
            <Suspense fallback={<HeaderSkelton />}>
              <Navbar />
            </Suspense>
          </div>
        </div>
      </header>
    </>
  );
}
