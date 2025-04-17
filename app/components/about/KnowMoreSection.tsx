import Image from "next/image";
import React from "react";

const KnowMoreSection = ({ about_details, about_img }) => {
  return (
    <div className="pt-[110px] max-1024:pt-[55px] max-1600:pt-[80px] pb-[120px] max-1024:pb-[60px] max-1600:pb-[80px]">
      <div className="auc-container">
        <div className="grid grid-cols-1 min-1024:grid-cols-2 items-start gap-y-[24px] min-1024:gap-y-0 min-1024:gap-x-[20px] min-1200:gap-x-[40px] min-1440:gap-x-[60px] min-1600:gap-x-[80px] min-1920:gap-x-0">
          {/* col-1 image galary  */}
          <div className="min-992:!sticky min-992:top-[30px] min-992:left-0 min-992:pr-[30px] min-1440:pr-[80px]">
            {about_img && (
              <Image
                src={about_img}
                width={752}
                height={805}
                className="col-span-2 w-full rounded-[12px]"
                alt={""}
              />
            )}
          </div>
          {/* col-2 */}
          <div className="flex flex-col items-start gap-[32px]">
            <span dangerouslySetInnerHTML={{ __html: about_details }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowMoreSection;
