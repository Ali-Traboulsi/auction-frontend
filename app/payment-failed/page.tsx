"use client";
import Image from "next/image";
import React from "react";
import Button from "../components/buttons/Button";
// import { useParams } from 'next/navigation'

export default function PaymentFailed({ params, searchParams }) {
  return (
    <div className="auc-container py-[80px] ">
      <div className="flex justify-center items-center flex-col gap-4 ">
        <h3 className="text-red-700">
          {searchParams?.msg
            ? searchParams?.msg + " !!!"
            : "Something went Wrong!!!"}
        </h3>
        <Image
          src={`/assets/img/Failed.png`}
          width={500}
          height={400}
          alt="success page"
          className="bg-cover"
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
