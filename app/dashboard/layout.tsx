"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { IChildren } from "../interfaces/interfaces";
import SideNav from "../components/dashboard/SideNav";
import { checkEmailKycActive } from "../../utils/ApiClientSideFunctions";
import { usePathname, useRouter } from "next/navigation";
import { DashboardSkeleton } from "../components/skeleton/skeleton";



const Layout: React.FC<IChildren> = ({ children }) => {

  const router = useRouter();
  const path = usePathname();

  const [loading,setLoading] = useState(true);

  useEffect(() => {
     checkEmailKycActive(setLoading,router);
  }, [path]);

  if(loading) return <DashboardSkeleton/>;

  return (
    <div className="bg-[#F7FBFA] pb-[120px]">
      <div className="flex dashboardContainer flex-col md:flex-row  min-1440:w-[1320px] min-1200:w-[1140px] min-992:w-[960px] min-768:w-[720px] min-576:w-[540px] min-320:w-full mx-auto">
        <div className="w-full min-320:hidden min-1024:block min-1440:w-[23.6%] min-1024:w-[30%]">
          <SideNav cls={`px-[24px] py-[48px]`} />
        </div>
        <div className="w-full max-h-screen overflow-scroll scrollbar-hidden min-1440:w-[76.4%] min-1024:w-[70%] px-[20px] min-768:px-[40px] pt-[16px] min-768:pt-[32px] pb-[60px] min-768:pb-[120px] bg-auc-white-color auc-dashboard-shadow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
