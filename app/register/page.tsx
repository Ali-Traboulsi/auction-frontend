"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Register from "../components/forms/Register";
import Image from "next/image";
import useGlobalStore from "../store/GlobalStore";

const RegisterPage = () => {
  return (
    <div className="auc-container">
      <div className="grid grid-cols-12 items-center pt-[100px] max-768:pt-[50px] pb-[120px] max-768:pb-[60px]">
        <Image
          src={"/assets/img/login-register.png"}
          width={803}
          height={771}
          className="col-span-6  relative -left-[200px] max-1920:-left-[70px] max-1440:-left-[50px] max-1200:-left-[40px] max-1024:hidden"
          alt={""}
        />
        <div className="col-span-6 max-1024:col-span-8 max-1024:col-start-3 max-992:col-span-10 max-992:col-start-2 max-768:col-span-12 ">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
