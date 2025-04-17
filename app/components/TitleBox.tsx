import React from "react";
interface ITitleBox {
  title: string;
  subtitle?: string;
}

export default function TitleBox({ title, subtitle }: ITitleBox) {
  return (
    <div
      suppressHydrationWarning
      className="flex justify-center mb-[40px] wow fadeInUp"
    >
      <div className="w-[627px] text-center">
        <h2 className="mb-[24px]">{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
