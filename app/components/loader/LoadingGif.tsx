import Image from "next/image";
import React from "react";

export default function LoadingGif() {
  return (
    <div
      className={`auc-container h-full w-full flex justify-center items-center`}
    >
      <Image
        width={100}
        height={100}
        src={`/assets/img/loading-gif.gif`}
        alt="loading"
        className="fixed top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"
      />
    </div>
  );
}
