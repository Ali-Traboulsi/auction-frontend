import React from "react";

const AboutInfoCard = ({svg, title, description, svgContainerBg, aboutInfoCardBorder}) => {

  return (
    <div className={`flex flex-col min-425:flex-row gap-[22px] min-425:items-center px-[24px] py-[16px] w-full rounded-bl-[30px]  border-l-[3px] bg-auc-white-color ${aboutInfoCardBorder}  auc-shadow-secondary `}>
      <div className={`flex items-center justify-center w-[100px] h-[100px] p-[20px] flex-shrink-0 rounded-[4px] ${svgContainerBg}`}>
        {svg}
      </div>
      <div className="flex flex-col items-start gap-[12px]">
        <h4 className="text-[20px] text-auc-primary-color-900 font-semibold leading-[130%]">
          {title}
        </h4>
        <p className="text-[16px] font-normal leading-[170%] text-auc-text-color-800">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutInfoCard;
