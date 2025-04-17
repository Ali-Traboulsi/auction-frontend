"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import { TableSkeleton } from "../components/skeleton/skeleton";

export default function PaymentSuccess({ searchParams }) {
  const [isUiLoaded, setuiLoaded] = useState(false);

  useEffect(() => {
    setuiLoaded(true);
  }, []);

  if (!isUiLoaded) return <TableSkeleton />;

  return (
    <div className="auc-container py-[80px] ">
      <div className="flex justify-center items-center flex-col gap-4 ">
        <h3 className="">
          {searchParams?.msg
            ? searchParams?.msg + " !!!"
            : "Payment completed successfully!!!"}
        </h3>
        <Image
          src={`/assets/img/Success.png`}
          width={500}
          height={400}
          alt="success page"
        />

        <Button
          text={"Back To Dashboard"}
          styles={"auc-btn-primary w-[309px] mx-auto mt-[60px]"}
          isLink={true}
          href="/dashboard"
        />
      </div>
    </div>
  );
}


