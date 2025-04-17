"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Description from "./accordion/Description";
import Specification from "./accordion/Specification";
import AuctionHistory from "./accordion/AuctionHistory";
import MoreFromVendor from "./accordion/MoreFromVendor";
import { truncateString } from "../../helpers/helpers";
export default function DesAccordionSection({
  description,
  specification,
  auction_history,
  vendor_products,
}) {


  // active tab
  const [activeValue, setactiveValue] = useState("");
  const firstTabRef = useRef(null);

  const data = [
    {
      label: "Description",
      value: "description",
      desc: <Description  des={description}/>,
    },
    {
      label: "Specification",
      value: "specification",
      desc: <Specification  data={specification}/>,
    },
    {
      label: "Auction History",
      value: "auction_history",
      desc: <AuctionHistory data={auction_history}/>,
    },
    {
      label: "More From Vendor",
      value: "more_from_vendor",
      desc: <MoreFromVendor data={vendor_products}/>,
    },
  ];

  useEffect(() => {
    setactiveValue(data[0].value);
    // make click on the first element of tab
    if (firstTabRef.current) {
      firstTabRef.current.click();
    }
  }, []);

  return (
    <div className="auc-container pb-[120px]">
      <Tabs value="html" className="w-full">
        <TabsHeader
          suppressHydrationWarning
          className="bg-transparent gap-[24px] flex-wrap md:flex-nowrap wow fadeInUp"
          data-wow-delay="0.1s"
          indicatorProps={{
            className: "bg-auc-primary-color active-auc-tab shadow-none",
          }}
        >
          {data.map((tab, index) => (
            <Tab
              ref={index === 0 ? firstTabRef : null}
              onClick={() => setactiveValue(tab.value)}
              className={`py[23px] px-[40px] h-[70px]   rounded-[8px] border border-auc-text-color-500 tab-lable ${
                activeValue === tab.value
                  ? "text-white"
                  : "text-auc-text-color-900"
              }`}
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
