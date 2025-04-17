import React from "react";

export default function Description({ des }) {
  return (
    <div className="mt-[40px]">
      <div dangerouslySetInnerHTML={{ __html: des }}></div>
    </div>
  );
}
